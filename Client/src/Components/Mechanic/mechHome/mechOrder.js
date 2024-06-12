import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mechorder.css';
import Navmech from './Navmech';
import MapComponent from '../mechHome/MapComponent';

const MechanicOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const mechanicResponse = await fetch("http://localhost:3004/mech/getmech", {
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

        const ordersResponse = await axios.get(`http://localhost:3004/mech/orders/mechanic/${mechanicId}`, {
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

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3004/mech/order/status`,
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
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>User Name:</b> {order.userName}</p>
                <p><b>Latitude:</b> {order.userLatitude}</p>
                <p><b>Longitude:</b> {order.userLongitude}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p>
                <div className="order-actions">
                  <button onClick={() => handleStatusUpdate(order._id, 'Accepted')}>Accept</button>
                  <button onClick={() => handleStatusUpdate(order._id, 'Declined')}>Decline</button>
                  <button onClick={() => handleLocationClick(order.userLatitude, order.userLongitude)}>Location</button>
                </div>
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
      </div>
    </>
  );
};

export default MechanicOrders;












// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './mechHome.css';
// import Navmech from './Navmech';

// const MechanicOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         setError("No token found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch mechanic details first to get the mechanic ID
//         const mechanicResponse = await fetch("http://localhost:3004/mech/getmech", {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           },
//         });

//         if (!mechanicResponse.ok) {
//           const errorData = await mechanicResponse.json();
//           setError(errorData.message || "Failed to fetch mechanic details.");
//           setLoading(false);
//           return;
//         }

//         const mechanicData = await mechanicResponse.json();
//         const mechanicId = mechanicData._id;

//         // Now fetch the orders for this mechanic
//         const ordersResponse = await axios.get(`http://localhost:3004/mech/orders/mechanic/${mechanicId}`, {
//           headers: {
//             'x-auth-token': token,
//           },
//         });
//         setOrders(ordersResponse.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Error fetching orders.");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusUpdate = async (orderId, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:3004/mech/order/status`,
//         { orderId, status },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           }
//         }
//       );
//       // Update the local state to reflect the change
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order._id === orderId ? { ...order, status } : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       setError("Error updating order status.");
//     }
//   };

//   const handleLocationClick = (latitude, longitude) => {
//     window.open(`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`, '_blank');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <Navmech />
//       <div className="orders-container">
//         <h2>Orders for Mechanic</h2>
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <div className="orders-list">
//             {orders.map(order => (
//               <div key={order._id} className="order-card">
//                 <p><b>Order ID:</b> {order._id}</p>
//                 <p><b>User Name:</b> {order.userName}</p>
//                 <p><b>Latitude:</b> {order.userLatitude}</p>
//                 <p><b>Longitude:</b> {order.userLongitude}</p>
//                 <p><b>Status:</b> {order.status}</p>
//                 <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p>
//                 <div className="order-actions">
//                   <button onClick={() => handleStatusUpdate(order._id, 'Accepted')}>Accept</button>
//                   <button onClick={() => handleStatusUpdate(order._id, 'Declined')}>Decline</button>
//                   <button onClick={() => handleLocationClick(order.userLatitude, order.userLongitude)}>Location</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MechanicOrders;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './mechHome.css';
// import Navmech from './Navmech';
// import MechanicLocation from './Location';

// const MechanicOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         setError("No token found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch mechanic details first to get the mechanic ID
//         const mechanicResponse = await fetch("http://localhost:3004/mech/getmech", {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           },
//         });

//         if (!mechanicResponse.ok) {
//           const errorData = await mechanicResponse.json();
//           setError(errorData.message || "Failed to fetch mechanic details.");
//           setLoading(false);
//           return;
//         }

//         const mechanicData = await mechanicResponse.json();
//         const mechanicId = mechanicData._id;

//         // Now fetch the orders for this mechanic
//         const ordersResponse = await axios.get(`http://localhost:3004/mech/orders/mechanic/${mechanicId}`, {
//           headers: {
//             'x-auth-token': token,
//           },
//         });
//         setOrders(ordersResponse.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Error fetching orders.");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusUpdate = async (orderId, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:3004/mech/order/status`,
//         { orderId, status },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           }
//         }
//       );
//       // Update the local state to reflect the change
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order._id === orderId ? { ...order, status } : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       setError("Error updating order status.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <Navmech />
//       <div className="orders-container">
//         <h2>Orders for Mechanic</h2>
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <div className="orders-list">
//             {orders.map(order => (
//               <div key={order._id} className="order-card">
//                 <p><b>Order ID:</b> {order._id}</p>
//                 <p><b>User Name:</b> {order.userName}</p>
//                 <p><b>Latitude:</b> {order.userLatitude}</p>
//                 <p><b>Longitude:</b> {order.userLongitude}</p>
//                 <p><b>Status:</b> {order.status}</p>
//                 <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p>
//                 <div className="order-actions">
//                   <button onClick={() => handleStatusUpdate(order._id, 'Accepted')}>Accept</button>
//                   <button onClick={() => handleStatusUpdate(order._id, 'Declined')}>Decline</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
      
    
//     </>
//   );
// };

// export default MechanicOrders;

















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './mechHome.css';
// import Navmech from './Navmech';

// const MechanicOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         setError("No token found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch mechanic details first to get the mechanic ID
//         const mechanicResponse = await fetch("http://localhost:3004/mech/getmech", {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           },
//         });

//         if (!mechanicResponse.ok) {
//           const errorData = await mechanicResponse.json();
//           setError(errorData.message || "Failed to fetch mechanic details.");
//           setLoading(false);
//           return;
//         }

//         const mechanicData = await mechanicResponse.json();
//         const mechanicId = mechanicData._id;

//         // Now fetch the orders for this mechanic
//         const ordersResponse = await axios.get(`http://localhost:3004/mech/orders/mechanic/${mechanicId}`, {
//           headers: {
//             'x-auth-token': token,
//           },
//         });
//         setOrders(ordersResponse.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Error fetching orders.");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <Navmech />
//       <div className="orders-container">
//         <h2>Orders for Mechanic</h2>
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <ul>
//             {orders.map(order => (
//               <li key={order._id}>
//                 <p><b>Order ID:</b> {order._id}</p>
//                 <p><b>User:</b> {order.userName}</p>
//                 <p><b>Latitude:</b> {order.userLatitude}</p>
//                 <p><b>Longitude:</b> {order.userLongitude}</p>
//                 <p><b>Status:</b> {order.status}</p>
//                 <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default MechanicOrders;








