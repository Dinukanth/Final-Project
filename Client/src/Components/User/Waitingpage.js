import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../User/waiting.css';
import Spinner from './spinner';

const Waiting = () => {
    const [lastOrder, setLastOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLastOrder = async () => {
            try {
                const response = await axios.get('http://localhost:3004/mech/Orders');
                const orders = response.data;
                if (orders.length > 0) {
                    setLastOrder(orders[orders.length - 1]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch orders', error);
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchLastOrder();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!lastOrder) {
        return <p>No orders found.</p>;
    }

    const renderStatusMessage = (status) => {
        switch (status) {
            case 'Pending':
                return (
                    <>
                        <p>Waiting for mechanic response...</p>
                        <div className="spinner"></div>
                    </>
                );
            case 'Accepted':
                return (
                    <>
                        <p>Mechanic will come. Please wait...</p>
                        <div className="thumbs-up">👍</div>
                    </>
                );
            case 'Declined':
                return (
                    <>
                        <p>Sorry, please select another mechanic.</p>
                        <div className="thumbs-down">👎</div>
                    </>
                );
            default:
                return 'Unknown status.';
        }
    };

    return (
        <div className="waiting-container">
            <div className="waiting-card">
                <h2>Order Status</h2>
                <p>Mechanic Name: {lastOrder.mechanicName}</p>
                <p>Status: {lastOrder.status}</p>
                <p>{renderStatusMessage(lastOrder.status)}</p>
            </div>
        </div>
    );
};

export default Waiting;











// // src/components/Waiting.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Spinner from '../User/spinner'; // Ensure the correct path

// const Waiting = () => {
//     const { orderId } = useParams();
//     const [orderStatus, setOrderStatus] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('Order ID:', orderId); // Debugging to check orderId

//         if (!orderId || orderId === 'undefined') {
//             setError('Invalid order ID. Please check the link and try again.');
//             setLoading(false);
//             return;
//         }

//         const fetchOrderStatus = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3004/order/status/${orderId}`);
//                 setOrderStatus(response.data.status);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch order status', error);
//                 setError('Failed to fetch order status. Please try again later.');
//                 setLoading(false);
//             }
//         };

//         fetchOrderStatus();
//     }, [orderId]);

//     if (loading) {
//         return <Spinner />; // Show spinner while loading
//     }

//     if (error) {
//         return <div>{error}</div>; // Display error message if any
//     }

//     return (
//         <div>
//             <h2>Order Status</h2>
//             <p>Status: {orderStatus}</p>
//         </div>
//     );
// };

// export default Waiting;





// src/components/Waiting.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Spinner from '../User/spinner'; // Import the Spinner component

// const Waiting = () => {
//     const { orderId } = useParams();
//     const [orderStatus, setOrderStatus] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (!orderId || orderId === 'undefined') {
//             setError('Invalid order ID. Please check the link and try again.');
//             setLoading(false);
//             return;
//         }

//         const fetchOrderStatus = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3004/mech/order/status/${orderId}`);
//                 setOrderStatus(response.data.status);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch order status', error);
//                 setError('Failed to fetch order status. Please try again later.');
//                 setLoading(false);
//             }
//         };

//         fetchOrderStatus();
//     }, [orderId]);

//     if (loading) {
//         return <Spinner />; // Show spinner while loading
//     }

//     if (error) {
//         return <div>{error}</div>; // Display error message if any
//     }

//     return (
//         <div>
//             <h2>Order Status</h2>
//             <p>Status: {orderStatus}</p>
//         </div>
//     );
// };

// export default Waiting;









// // src/components/Waiting.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Waiting = () => {
//     const { orderId } = useParams();
//     const [orderStatus, setOrderStatus] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrderStatus = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3004/mech/order/status/${orderId}`);
//                 setOrderStatus(response.data.status);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch order status', error);
//                 setLoading(false);
//             }
//         };

//         if (orderId) {
//             fetchOrderStatus();
//         }
//     }, [orderId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Order Status</h2>
//             <p>Status: {orderStatus}</p>
//         </div>
//     );
// };

// export default Waiting;

















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../Admin/Orderadmin.css';

// const AdminOrderDetails = () => {
//     const { id } = useParams(); // Extract the id from the URL parameters
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3004/mech/order/${id}`); // Fetch the order by id

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 setOrder(data); // Set the order data
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch order', error);
//                 setError('Failed to fetch order');
//                 setLoading(false);
//             }
//         };

//         fetchOrder();
//     }, [id]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     if (!order) {
//         return <p>Order not found</p>;
//     }

//     return (
//         <div>
//             <h2>Order Details</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Mechanic Name</th>
//                         <th>Status</th>
//                         <th>Created At</th>
//                         <th>User Name</th>
//                         <th>User Email</th>
//                         <th>User Phone</th>
//                         <th>Vehicle Issue</th>
//                         <th>Location</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{order._id}</td>
//                         <td>{order.mechanicName}</td>
//                         <td>{order.status}</td>
//                         <td>{new Date(order.createdAt).toLocaleString()}</td>
//                         <td>{order.userName}</td>
//                         <td>{order.userEmail}</td>
//                         <td>{order.userPhone}</td>
//                         <td>{order.vehicleIssue}</td>
//                         <td>{`Latitude: ${order.location.latitude}, Longitude: ${order.location.longitude}`}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminOrderDetails;
