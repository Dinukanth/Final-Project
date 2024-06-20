import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../User/Nearbymechanic.css';
import MechanicMap from '../User/Mechanicmap';

const socket = io('https://final-project-2vgx.onrender.com'); // Adjust the URL as needed

const NearbyMechanics = ({ latitude, longitude }) => {
    const navigate = useNavigate();
    const [nearbyMechanics, setNearbyMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [hiredMechanic, setHiredMechanic] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [orderId, setOrderId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchNearbyMechanics = async () => {
            try {
                const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
                    latitude,
                    longitude
                });
                setNearbyMechanics(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch nearby mechanics', error);
                setLoading(false);
            }
        };

        if (latitude && longitude) {
            fetchNearbyMechanics();
        }
    }, [latitude, longitude]);

    const handleHire = async (mechanic) => {
        try {
            const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
                mechanicId: mechanic._id,
                userLatitude: latitude,
                userLongitude: longitude
            });

            if (response.status === 200) {
                setHiredMechanic(mechanic);
                setOrderId(response.data.orderId);
                setShowPopup(true);
                setShowMap(false);

                // Print order details to console
                console.log('Order details:', {
                    mechanic,
                    orderId: response.data.orderId,
                    userLatitude: latitude,
                    userLongitude: longitude,
                });

                // Navigate to waiting page with the order ID
                setTimeout(() => {
                    navigate(`/waiting`);
                }, 2000);
            } else {
                alert('Failed to hire mechanic');
            }
        } catch (error) {
            console.error('Failed to hire mechanic', error);
            alert('Failed to hire mechanic');
        }
    };

    useEffect(() => {
        if (orderId) {
            socket.on('orderStatusChanged', (updatedOrder) => {
                if (updatedOrder._id === orderId) {
                    setOrderStatus(updatedOrder.status);
                }
            });

            return () => {
                socket.off('orderStatusChanged');
            };
        }
    }, [orderId]);

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <h2>Nearby Mechanics</h2>
            <button onClick={() => setShowMap(true)}>
                {orderStatus === 'Accepted'
                    ? 'Mechanic will come'
                    : orderStatus === 'Declined'
                    ? 'Select another mechanic'
                    : hiredMechanic
                    ? `Request: ${hiredMechanic.Name}`
                    : 'Show Map'}
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {showMap && (
                        <MechanicMap
                            latitude={latitude}
                            longitude={longitude}
                            nearbyMechanics={nearbyMechanics}
                            onClose={() => setShowMap(false)}
                            onHire={handleHire}
                        />
                    )}
                    {orderStatus && <p>Order Status: {orderStatus}</p>}
                </>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Success</h3>
                        <p>Request sent to mechanic: <strong>{hiredMechanic.Name}</strong></p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NearbyMechanics;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import '../User/Nearbymechanic.css';
// import MechanicMap from '../User/Mechanicmap';

// const socket = io('https://final-project-2vgx.onrender.com'); // Adjust the URL as needed

// const NearbyMechanics = ({ latitude, longitude }) => {
//     const navigate = useNavigate();
//     const [nearbyMechanics, setNearbyMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showMap, setShowMap] = useState(false);
//     const [hiredMechanic, setHiredMechanic] = useState(null);
//     const [orderStatus, setOrderStatus] = useState('');
//     const [orderId, setOrderId] = useState(null);

//     useEffect(() => {
//         const fetchNearbyMechanics = async () => {
//             try {
//                 const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//                     latitude,
//                     longitude
//                 });
//                 setNearbyMechanics(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch nearby mechanics', error);
//                 setLoading(false);
//             }
//         };

//         if (latitude && longitude) {
//             fetchNearbyMechanics();
//         }
//     }, [latitude, longitude]);

//     const handleHire = async (mechanic) => {
//         try {
//             const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//                 mechanicId: mechanic._id,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             });

//             if (response.status === 200) {
//                 alert('Mechanic hired successfully');
//                 setHiredMechanic(mechanic);
//                 setOrderId(response.data.orderId);
//                 setShowMap(false);
//                 navigate(`/waiting/${response.data.orderId}`);
//             } else {
//                 alert('Failed to hire mechanic');
//             }
//         } catch (error) {
//             console.error('Failed to hire mechanic', error);
//             alert('Failed to hire mechanic');
//         }
//     };

//     useEffect(() => {
//         if (orderId) {
//             socket.on('orderStatusChanged', (updatedOrder) => {
//                 if (updatedOrder._id === orderId) {
//                     setOrderStatus(updatedOrder.status);
//                 }
//             });

//             return () => {
//                 socket.off('orderStatusChanged');
//             };
//         }
//     }, [orderId]);

//     return (
//         <div>
//             <h2>Nearby Mechanics</h2>
//             <button onClick={() => setShowMap(true)}>
//                 {orderStatus === 'Accepted' ? 'Mechanic will come' : orderStatus === 'Declined' ? 'Select another mechanic' : (hiredMechanic ? `Request: ${hiredMechanic.Name}` : 'Show Map')}
//             </button>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {showMap && (
//                         <MechanicMap
//                             latitude={latitude}
//                             longitude={longitude}
//                             nearbyMechanics={nearbyMechanics}
//                             onClose={() => setShowMap(false)}
//                             onHire={handleHire}
//                         />
//                     )}
//                     {orderStatus && <p>Order Status: {orderStatus}</p>}
//                 </>
//             )}
//         </div>
//     );
// };

// export default NearbyMechanics;















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import '../User/Nearbymechanic.css';
// import MechanicMap from '../User/Mechanicmap';

// const socket = io('https://final-project-2vgx.onrender.com'); // Adjust the URL as needed

// const NearbyMechanics = ({ latitude, longitude }) => {
//   const navigate = useNavigate();
//   const [nearbyMechanics, setNearbyMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMap, setShowMap] = useState(false);
//   const [hiredMechanic, setHiredMechanic] = useState(null);
//   const [orderStatus, setOrderStatus] = useState('');
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const fetchNearbyMechanics = async () => {
//       try {
//         const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//           latitude,
//           longitude
//         });
//         setNearbyMechanics(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch nearby mechanics', error);
//         setLoading(false);
//       }
//     };

//     if (latitude && longitude) {
//       fetchNearbyMechanics();
//     }
//   }, [latitude, longitude]);

//   const handleHire = async (mechanic) => {
//     try {
//       const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//         mechanicId: mechanic._id,
//         userLatitude: latitude,
//         userLongitude: longitude
//       });

//       if (response.status === 200) {
//         alert('Mechanic hired successfully');
//         setHiredMechanic(mechanic);
//         setOrderId(response.data.orderId); 
//         setShowMap(false);
//         navigate(`/waiting/${response.data.orderId}`);
//       } else {
//         alert('Failed to hire mechanic');
//       }
//     } catch (error) {
//       console.error('Failed to hire mechanic', error);
//       alert('Failed to hire mechanic');
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       socket.on('orderStatusChanged', (updatedOrder) => {
//         if (updatedOrder._id === orderId) {
//           setOrderStatus(updatedOrder.status);
//         }
//       });

//       return () => {
//         socket.off('orderStatusChanged');
//       };
//     }
//   }, [orderId]);

//   return (
//     <div>
//       <h2>Nearby Mechanics</h2>
//       <button onClick={() => setShowMap(true)}>
//         {orderStatus === 'Accepted' ? 'Mechanic will come' : orderStatus === 'Declined' ? 'Select another mechanic' : (hiredMechanic ? `Request: ${hiredMechanic.Name}` : 'Show Map')}
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {showMap && (
//             <MechanicMap
//               latitude={latitude}
//               longitude={longitude}
//               nearbyMechanics={nearbyMechanics}
//               onClose={() => setShowMap(false)}
//               onHire={handleHire}
//             />
//           )}
//           {orderStatus && <p>Order Status: {orderStatus}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default NearbyMechanics;




















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// import '../User/Nearbymechanic.css';
// import MechanicMap from '../User/Mechanicmap';

// const socket = io('https://final-project-2vgx.onrender.com'); // Adjust the URL as needed

// const NearbyMechanics = ({ latitude, longitude }) => {
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const [nearbyMechanics, setNearbyMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMap, setShowMap] = useState(false);
//   const [hiredMechanic, setHiredMechanic] = useState(null);
//   const [orderStatus, setOrderStatus] = useState('');
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const fetchNearbyMechanics = async () => {
//       try {
//         const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//           latitude,
//           longitude
//         });
//         setNearbyMechanics(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch nearby mechanics', error);
//         setLoading(false);
//       }
//     };

//     if (latitude && longitude) {
//       fetchNearbyMechanics();
//     }
//   }, [latitude, longitude]);

//   const handleHire = async (mechanic) => {
//     try {
//       const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//         mechanicId: mechanic._id,
//         userLatitude: latitude,
//         userLongitude: longitude
//       });

//       if (response.status === 200) {
//         alert('Mechanic hired successfully');
//         setHiredMechanic(mechanic);
//         setOrderId(response.data.orderId); 
//         setShowMap(false);

//         // Navigate to waiting page after hiring mechanic
//         navigate(`/waiting/${response.data.orderId}`); // Use navigate function
//       } else {
//         alert('Failed to hire mechanic');
//       }
//     } catch (error) {
//       console.error('Failed to hire mechanic', error);
//       alert('Failed to hire mechanic');
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       socket.on('orderStatusChanged', (updatedOrder) => {
//         if (updatedOrder._id === orderId) {
//           setOrderStatus(updatedOrder.status);
//         }
//       });

//       return () => {
//         socket.off('orderStatusChanged');
//       };
//     }
//   }, [orderId]);

//   return (
//     <div>
//       <h2>Nearby Mechanics</h2>
//       <button onClick={() => setShowMap(true)}>
//         {orderStatus === 'Accepted' ? 'Mechanic will come' : orderStatus === 'Declined' ? 'Select another mechanic' : (hiredMechanic ? `Request: ${hiredMechanic.Name}` : 'Show Map')}
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {showMap && (
//             <MechanicMap
//               latitude={latitude}
//               longitude={longitude}
//               nearbyMechanics={nearbyMechanics}
//               onClose={() => setShowMap(false)}
//               onHire={handleHire}
//             />
//           )}
//           {orderStatus && <p>Order Status: {orderStatus}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default NearbyMechanics;

















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import '../User/Nearbymechanic.css';
// import MechanicMap from '../User/Mechanicmap';

// const socket = io('https://final-project-2vgx.onrender.com'); // Adjust the URL as needed

// const NearbyMechanics = ({ latitude, longitude }) => {
//   const [nearbyMechanics, setNearbyMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMap, setShowMap] = useState(false);
//   const [hiredMechanic, setHiredMechanic] = useState(null);
//   const [orderStatus, setOrderStatus] = useState('');
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const fetchNearbyMechanics = async () => {
//       try {
//         const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//           latitude,
//           longitude
//         });
//         setNearbyMechanics(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch nearby mechanics', error);
//         setLoading(false);
//       }
//     };

//     if (latitude && longitude) {
//       fetchNearbyMechanics();
//     }
//   }, [latitude, longitude]);

//   const handleHire = async (mechanic) => {
//     try {
//       const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//         mechanicId: mechanic._id,
//         userLatitude: latitude,
//         userLongitude: longitude
//       });

//       if (response.status === 200) {
//         alert('Mechanic hired successfully');
//         setHiredMechanic(mechanic);
//         setOrderId(response.data.orderId); 
//         setShowMap(false);
//       } else {
//         alert('Failed to hire mechanic');
//       }
//     } catch (error) {
//       console.error('Failed to hire mechanic', error);
//       alert('Failed to hire mechanic');
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       socket.on('orderStatusChanged', (updatedOrder) => {
//         if (updatedOrder._id === orderId) {
//           setOrderStatus(updatedOrder.status);
//         }
//       });

//       return () => {
//         socket.off('orderStatusChanged');
//       };
//     }
//   }, [orderId]);

//   return (
//     <div>
//       <h2>Nearby Mechanics</h2>
//       <button onClick={() => setShowMap(true)}>
//         {orderStatus === 'Accepted' ? 'Mechanic will come' : orderStatus === 'Declined' ? 'Select another mechanic' : (hiredMechanic ? `Request: ${hiredMechanic.Name}` : 'Show Map')}
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {showMap && (
//             <MechanicMap
//               latitude={latitude}
//               longitude={longitude}
//               nearbyMechanics={nearbyMechanics}
//               onClose={() => setShowMap(false)}
//               onHire={handleHire}
//             />
//           )}
//           {orderStatus && <p>Order Status: {orderStatus}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default NearbyMechanics;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../User/Nearbymechanic.css';
// import MechanicMap from '../User/Mechanicmap';

// const NearbyMechanics = ({ latitude, longitude }) => {
//   const [nearbyMechanics, setNearbyMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMap, setShowMap] = useState(false);
//   const [hiredMechanic, setHiredMechanic] = useState(null);
//   const [orderStatus, setOrders] = useState('');
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const fetchNearbyMechanics = async () => {
//       try {
//         const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//           latitude,
//           longitude
//         });
//         setNearbyMechanics(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch nearby mechanics', error);
//         setLoading(false);
//       }
//     };

//     if (latitude && longitude) {
//       fetchNearbyMechanics();
//     }
//   }, [latitude, longitude]);

//   const handleHire = async (mechanic) => {
//     try {
//       const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//         mechanicId: mechanic._id,
//         userLatitude: latitude,
//         userLongitude: longitude
//       });

//       if (response.status === 200) {
//         alert('Mechanic hired successfully');
//         setHiredMechanic(mechanic);
//         setOrderId(response.data.orderId); 
//         setShowMap(false);
//       } else {
//         alert('Failed to hire mechanic');
//       }
//     } catch (error) {
//       console.error('Failed to hire mechanic', error);
//       alert('Failed to hire mechanic');
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       const interval = setInterval(async (orderId, status) => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.put(
//               `https://final-project-2vgx.onrender.com/mech/order/status`,
//               { orderId, status },
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'x-auth-token': token,
//                 }
//               }
//             );
//             setOrders(prevOrders =>
//               prevOrders.map(order =>
//                 order._id === orderId ? { ...order, status } : order
//               )
//             );
//         } catch (error) {
//           console.error('Failed to fetch order status', error);
//         }
//       }, ); 
//       return () => clearInterval(interval); // Cleanup on unmount
//     }
//   }, [orderId]);

//   return (
//     <div>
//       <h2>Nearby Mechanics</h2>
//       <button onClick={() => setShowMap(true)}>
//         {hiredMechanic ? `Request: ${hiredMechanic.Name}` : 'Show Map'}
       
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {showMap && (
//             <MechanicMap
//               latitude={latitude}
//               longitude={longitude}
//               nearbyMechanics={nearbyMechanics}
//               onClose={() => setShowMap(false)}
//               onHire={handleHire}
//             />
//           )}
//           {orderStatus && <p>Order Status: {orderStatus}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default NearbyMechanics;




















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import '../User/Nearbymechanic.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const NearbyMechanics = ({ latitude, longitude }) => {
//     const [nearbyMechanics, setNearbyMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showMap, setShowMap] = useState(false);
//     const [hiredMechanic, setHiredMechanic] = useState(null);

//     useEffect(() => {
//         const fetchNearbyMechanics = async () => {
//             try {
//                 const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//                     latitude,
//                     longitude
//                 });
//                 setNearbyMechanics(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch nearby mechanics', error);
//                 setLoading(false);
//             }
//         };

//         if (latitude && longitude) {
//             fetchNearbyMechanics();
//         }
//     }, [latitude, longitude]);

//     const handleHire = async (mechanic) => {
//         try {
//             const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//                 mechanicId: mechanic._id,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             });

//             if (response.status === 200) {
//                 alert('Mechanic hired successfully');
//                 setHiredMechanic(mechanic);
//                 setShowMap(false);
//             } else {
//                 alert('Failed to hire mechanic');
//             }
//         } catch (error) {
//             console.error('Failed to hire mechanic', error);
//             alert('Failed to hire mechanic');
//         }
//     };

//     return (
//         <div>
//             <h2>Nearby Mechanics</h2>
//             <button onClick={() => setShowMap(true)}>
//                 {hiredMechanic ? `Hired: ${hiredMechanic.Name}` : 'Show Map'}
//             </button>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {showMap && (
//                         <div className="modal">
//                             <div className="modal-content">
//                                 <span className="close" onClick={() => setShowMap(false)}>&times;</span>
//                                 <MapContainer center={[latitude, longitude]} zoom={13} className="map">
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                     />
//                                     <Marker position={[latitude, longitude]}>
//                                         <Popup>You are here</Popup>
//                                     </Marker>
//                                     {nearbyMechanics.map(mechanic => (
//                                         <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
//                                             <Popup>
//                                                 <div>
//                                                     <h3>{mechanic.Name}</h3>
//                                                     <p>{mechanic.Address}</p>
//                                                     <p>Type: {mechanic.WhatkindofMechanic}</p>
//                                                     <p>Phone: {mechanic.Phonenumber}</p>
//                                                     <p>Distance: {mechanic.distance.toFixed()} km</p>
//                                                     <button onClick={() => handleHire(mechanic)}>Hire</button>
//                                                 </div>
//                                             </Popup>
//                                         </Marker>
//                                     ))}
//                                 </MapContainer>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default NearbyMechanics;























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import '../User/Nearbymechanic.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const NearbyMechanics = ({ latitude, longitude }) => {
//     const [nearbyMechanics, setNearbyMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showMap, setShowMap] = useState(false);
//     const [hiredMechanic, setHiredMechanic] = useState(null);
//     const [userFormDetails, setUserFormDetails] = useState({ userId: '', serviceDetails: '' });

//     useEffect(() => {
//         const fetchNearbyMechanics = async () => {
//             try {
//                 const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//                     latitude,
//                     longitude
//                 });
//                 setNearbyMechanics(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch nearby mechanics', error);
//                 setLoading(false);
//             }
//         };

//         const fetchUserFormDetails = async () => {
//             try {
//                 const response = await axios.get('https://final-project-2vgx.onrender.com/form/getUserFormDetails', {
//                     params: { userId: 'USER_ID' } // Replace with actual user ID logic
//                 });
//                 setUserFormDetails(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch user form details', error);
//             }
//         };

//         if (latitude && longitude) {
//             fetchNearbyMechanics();
//             fetchUserFormDetails();
//         }
//     }, [latitude, longitude]);

//     const handleHire = async (mechanic) => {
//         try {
//             const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//                 mechanicId: mechanic._id,
//                 userId: userFormDetails.userId,
//                 serviceDetails: userFormDetails.serviceDetails,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             });

//             if (response.status === 200) {
//                 alert('Mechanic hired successfully');
//                 setHiredMechanic(mechanic);
//                 setShowMap(false);
//             } else {
//                 alert('Failed to hire mechanic');
//             }
//         } catch (error) {
//             console.error('Failed to hire mechanic', error);
//             alert('Failed to hire mechanic');
//         }
//     };

//     return (
//         <div>
//             <h2>Nearby Mechanics</h2>
//             <button onClick={() => setShowMap(true)}>
//                 {hiredMechanic ? `Hired: ${hiredMechanic.Name}` : 'Show Map'}
//             </button>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {showMap && (
//                         <div className="modal">
//                             <div className="modal-content">
//                                 <span className="close" onClick={() => setShowMap(false)}>&times;</span>
//                                 <MapContainer center={[latitude, longitude]} zoom={13} className="map">
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                     />
//                                     <Marker position={[latitude, longitude]}>
//                                         <Popup>You are here</Popup>
//                                     </Marker>
//                                     {nearbyMechanics.map(mechanic => (
//                                         <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
//                                             <Popup>
//                                                 <div>
//                                                     <h3>{mechanic.Name}</h3>
//                                                     <p>{mechanic.Address}</p>
//                                                     <p>Type: {mechanic.WhatkindofMechanic}</p>
//                                                     <p>Phone: {mechanic.Phonenumber}</p>
//                                                     <p>Distance: {mechanic.distance.toFixed()} km</p>
//                                                     <button onClick={() => handleHire(mechanic)}>Hire</button>
//                                                 </div>
//                                             </Popup>
//                                         </Marker>
//                                     ))}
//                                 </MapContainer>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default NearbyMechanics;































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import '../User/Nearbymechanic.css';
// 
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
    // iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    // iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });
// 
// const NearbyMechanics = ({ latitude, longitude }) => {
    // const [nearbyMechanics, setNearbyMechanics] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [showMap, setShowMap] = useState(false);
    // const [hiredMechanic, setHiredMechanic] = useState(null);
// 
    // useEffect(() => {
        // const fetchNearbyMechanics = async () => {
            // try {
                // const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
                    // latitude,
                    // longitude
                // });
                // setNearbyMechanics(response.data);
                // setLoading(false);
            // } catch (error) {
                // console.error('Failed to fetch nearby mechanics', error);
                // setLoading(false);
            // }
        // };
// 
        // if (latitude && longitude) {
            // fetchNearbyMechanics();
        // }
    // }, [latitude, longitude]);
// 
    // const handleHire = async (mechanic) => {
        // try {
            // const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
                // mechanicId: mechanic._id,
                // userLatitude: latitude,
                // userLongitude: longitude
            // });
// 
            // if (response.status === 200) {
                // alert('Mechanic hired successfully');
                // setHiredMechanic(mechanic);
                // setShowMap(false);
            // } else {
                // alert('Failed to hire mechanic');
            // }
        // } catch (error) {
            // console.error('Failed to hire mechanic', error);
            // alert('Failed to hire mechanic');
        // }
    // };
// 
    // return (
        // <div>
            {/* <h2>Nearby Mechanics</h2> */}
            {/* <button onClick={() => setShowMap(true)}> */}
                {/* {hiredMechanic ? `Hired: ${hiredMechanic.Name}` : 'Show Map'} */}
            {/* </button> */}
            {/* {loading ? ( */}
                // <p>Loading...</p>
            // ) : (
                // <>
                    {/* {showMap && ( */}
                        // <div className="modal">
                            {/* <div className="modal-content"> */}
                                {/* <span className="close" onClick={() => setShowMap(false)}>&times;</span> */}
                                {/* <MapContainer center={[latitude, longitude]} zoom={13} className="map"> */}
                                    {/* <TileLayer */}
                                        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    // />
                                    {/* <Marker position={[latitude, longitude]}> */}
                                        {/* <Popup>You are here</Popup> */}
                                    {/* </Marker> */}
                                    {/* {nearbyMechanics.map(mechanic => ( */}
                                        // <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
                                            {/* <Popup> */}
                                                {/* <div> */}
                                                    {/* <h3>{mechanic.Name}</h3> */}
                                                    {/* <p>{mechanic.Address}</p> */}
                                                    {/* <p>Type: {mechanic.WhatkindofMechanic}</p> */}
                                                    {/* <p>Phone: {mechanic.Phonenumber}</p> */}
                                                    {/* <p>Distance: {mechanic.distance.toFixed()} km</p> */}
                                                    {/* <button onClick={() => handleHire(mechanic)}>Hire</button> */}
        //                                         {/* </div> */}
        //                                     {/* </Popup> */}
        //                                 {/* </Marker> */}
        //                             // ))}
        //                         {/* </MapContainer> */}
        //                     {/* </div> */}
        //                 {/* </div> */}
        //             // )}
        //         {/* </> */}
        //     // )}
        // {/* </div> */}
    // );
// };
// 
// export default NearbyMechanics;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import '../User/Nearbymechanic.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const NearbyMechanics = ({ latitude, longitude }) => {
//     const [nearbyMechanics, setNearbyMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showMap, setShowMap] = useState(false);

//     useEffect(() => {
//         const fetchNearbyMechanics = async () => {
//             try {
//                 const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//                     latitude,
//                     longitude
//                 });
//                 setNearbyMechanics(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch nearby mechanics', error);
//                 setLoading(false);
//             }
//         };

//         if (latitude && longitude) {
//             fetchNearbyMechanics();
//         }
//     }, [latitude, longitude]);

//     const handleHire = async (mechanicId) => {
//         try {
//             const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//                 mechanicId,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             });

//             if (response.status === 200) {
//                 alert('Mechanic hired successfully');
//             } else {
//                 alert('Failed to hire mechanic');
//             }
//         } catch (error) {
//             console.error('Failed to hire mechanic', error);
//             alert('Failed to hire mechanic');
//         }
//     };

//     return (
//         <div>
//             <h2>Nearby Mechanics</h2>
//             <button onClick={() => setShowMap(true)}>Show Map</button>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     {showMap && (
//                         <div className="modal">
//                             <div className="modal-content">
//                                 <span className="close" onClick={() => setShowMap(false)}>&times;</span>
//                                 <MapContainer center={[latitude, longitude]} zoom={13} className="map">
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                     />
//                                     <Marker position={[latitude, longitude]}>
//                                         <Popup>You are here</Popup>
//                                     </Marker>
//                                     {nearbyMechanics.map(mechanic => (
//                                         <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
//                                             <Popup>
//                                                 <div>
//                                                     <h3>{mechanic.Name}</h3>
//                                                     <p>{mechanic.Address}</p>
//                                                     <p>Type: {mechanic.WhatkindofMechanic}</p>
//                                                     <p>Phone: {mechanic.Phonenumber}</p>
//                                                     <p>Distance: {mechanic.distance.toFixed()} km</p>
//                                                     <button onClick={() => handleHire(mechanic._id)}>Hire</button>
//                                                 </div>
//                                             </Popup>
//                                         </Marker>
//                                     ))}
//                                 </MapContainer>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default NearbyMechanics;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import '../User/Nearbymechanic.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const NearbyMechanics = ({ latitude, longitude }) => {
//     const [nearbyMechanics, setNearbyMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userId, setUserId] = useState(''); 

//     useEffect(() => {
//         const fetchNearbyMechanics = async () => {
//             try {
//                 const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//                     latitude,
//                     longitude
//                 });
//                 setNearbyMechanics(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch nearby mechanics', error);
//                 setLoading(false);
//             }
//         };

//         if (latitude && longitude) {
//             fetchNearbyMechanics();
//         }
//     }, [latitude, longitude]);

//     const handleHire = async (mechanicId) => {
//         try {
//             const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//                 mechanicId,
//                 userId,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             });

//             if (response.status === 200) {
//                 alert('Mechanic hired successfully');
//             } else {
//                 alert('Failed to hire mechanic');
//             }
//         } catch (error) {
//             console.error('Failed to hire mechanic', error);
//             alert('Failed to hire mechanic');
//         }
//     };

//     return (
//         <div className="map-container">
//             <h2>Nearby Mechanics</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <MapContainer center={[latitude, longitude]} zoom={13} className="map">
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={[latitude, longitude]}>
//                         <Popup>You are here</Popup>
//                     </Marker>
//                     {nearbyMechanics.map(mechanic => (
//                         <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
//                             <Popup>
//                                 <div>
//                                     <h3>{mechanic.Name}</h3>
//                                     <p>{mechanic.Address}</p>
//                                     <p>Type: {mechanic.WhatkindofMechanic}</p>
//                                     <p>Phone: {mechanic.Phonenumber}</p>
//                                     <p>Distance: {mechanic.distance.toFixed()} km</p>
//                                     <button onClick={() => handleHire(mechanic._id)}>Hire</button>
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             )}
//         </div>
//     );
// };

// export default NearbyMechanics;





















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const NearbyMechanics = ({ latitude, longitude }) => {
//     const [nearbyMechanics, setNearbyMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userId, setUserId] = useState(''); 

//     useEffect(() => {
//         const fetchNearbyMechanics = async () => {
//             try {
//                 const response = await axios.post('https://final-project-2vgx.onrender.com/form/findnearbymechanics', {
//                     latitude,
//                     longitude
//                 });
//                 setNearbyMechanics(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch nearby mechanics', error);
//                 setLoading(false);
//             }
//         };

//         if (latitude && longitude) {
//             fetchNearbyMechanics();
//         }
//     }, [latitude, longitude]);

//     const handleHire = async (mechanicId) => {
//         try {
//             const response = await axios.post('https://final-project-2vgx.onrender.com/mech/hire', {
//                 mechanicId,
//                 userId,
//                 userLatitude: latitude,
//                 userLongitude: longitude
//             });

//             if (response.status === 200) {
//                 alert('Mechanic hired successfully');
//             } else {
//                 alert('Failed to hire mechanic');
//             }
//         } catch (error) {
//             console.error('Failed to hire mechanic', error);
//             alert('Failed to hire mechanic');
//         }
//     };

//     return (
//         <div>
//             <h2>Nearby Mechanics</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '600px', width: '100%' }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={[latitude, longitude]}>
//                         <Popup>You are here</Popup>
//                     </Marker>
//                     {nearbyMechanics.map(mechanic => (
//                         <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
//                             <Popup>
//                                 <div>
//                                     <h3>{mechanic.Name}</h3>
//                                     <p>{mechanic.Address}</p>
//                                     <p>Type: {mechanic.WhatkindofMechanic}</p>
//                                     <p>Phone: {mechanic.Phonenumber}</p>
//                                     <p>Distance: {mechanic.distance.toFixed()} km</p>
//                                     <button onClick={() => handleHire(mechanic._id)}>Hire</button>
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             )}
//         </div>
//     );
// };

// export default NearbyMechanics;

