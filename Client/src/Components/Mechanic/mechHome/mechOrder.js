import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mechorder.css';
import Navmech from './Navmech';
import MapComponent from '../mechHome/MapComponent';
import ConfirmationModal from './ConfirmationModal'; // Import the confirmation modal

const MechanicOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [notification, setNotification] = useState({});
  const [confirmingOrder, setConfirmingOrder] = useState({ orderId: null, status: null });

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const mechanicResponse = await fetch("https://final-project-2vgx.onrender.com/mech/getmech", {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!mechanicResponse.ok) {
          const errorData = await mechanicResponse.json();
          setError(errorData.message || "Failed to fetch mechanic details.");
          setLoading(false);
          return;
        }

        const mechanicData = await mechanicResponse.json();
        const mechanicId = mechanicData._id;

        const ordersResponse = await axios.get(`https://final-project-2vgx.onrender.com/mech/orders/mechanic/${mechanicId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setOrders(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async () => {
    const { orderId, status } = confirmingOrder;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://final-project-2vgx.onrender.com/mech/order/status`,
        { orderId, status },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          }
        }
      );
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      setNotification({ [orderId]: `Order ${status}` });

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification({});
      }, 3000);
      setConfirmingOrder({ orderId: null, status: null });
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Error updating order status.");
    }
  };

  const handleLocationClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
  };

  const closeModal = () => {
    setSelectedLocation(null);
  };

  const handleConfirm = (orderId, status) => {
    setConfirmingOrder({ orderId, status });
  };

  const handleCancelConfirm = () => {
    setConfirmingOrder({ orderId: null, status: null });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navmech />
      <div className="orders-container">
        <h2>Orders for Mechanic</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <p><b>User Name:</b> {order.userId ? order.userId.Name : 'Unknown'}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p>
                <div className="order-actions">
                  <button 
                    onClick={() => handleConfirm(order._id, 'Accepted')} 
                    disabled={order.status === 'Accepted' || order.status === 'Declined'}
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleConfirm(order._id, 'Declined')} 
                    disabled={order.status === 'Accepted' || order.status === 'Declined'}
                  >
                    Decline
                  </button>
                  <button onClick={() => handleLocationClick(order.userLatitude, order.userLongitude)}>Location</button>
                </div>
                {notification[order._id] && (
                  <div className="notification">
                    {notification[order._id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {selectedLocation && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <MapComponent lat={selectedLocation.lat} lng={selectedLocation.lng} />
            </div>
          </div>
        )}
        {confirmingOrder.orderId && (
          <ConfirmationModal
            message={`Are you sure you want to ${confirmingOrder.status.toLowerCase()} this order?`}
            onConfirm={handleStatusUpdate}
            onCancel={handleCancelConfirm}
          />
        )}
      </div>
    </>
  );
};

export default MechanicOrders;

