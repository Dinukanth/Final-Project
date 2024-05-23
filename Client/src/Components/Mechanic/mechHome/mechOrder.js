// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MechanicPage = () => {
//     const location = useLocation();
//     const userLocation = location.state?.userLocation;
//     const [mechanic, setMechanic] = useState(null);

//     useEffect(() => {
//         // Fetch mechanic data from the server
//         const fetchMechanic = async () => {
//             try {
//                 const response = await fetch("http://localhost:3004/api/mechanic"); // Adjust the endpoint as needed
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch mechanic data. Server responded with status: " + response.status);
//                 }
//                 const data = await response.json();
//                 setMechanic(data);
//             } catch (error) {
//                 console.error("Failed to fetch mechanic data", error);
//             }
//         };

//         fetchMechanic();
//     }, []);

//     return (
//         <div>
//             <h2>Mechanic Page</h2>
//             {mechanic && (
//                 <MapContainer center={mechanic.GarageLocation} zoom={13} style={{ height: "600px", width: "100%" }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={mechanic.GarageLocation}>
//                         <Popup>
//                             <strong>{mechanic.Name}</strong><br />
//                             {mechanic.WhatkindofMechanic}<br />
//                             {mechanic.Address}<br />
//                             {mechanic.Email}<br />
//                             {mechanic.Phonenumber}
//                         </Popup>
//                     </Marker>
//                     {userLocation && (
//                         <Marker position={[userLocation.latitude, userLocation.longitude]}>
//                             <Popup>User Location</Popup>
//                         </Marker>
//                     )}
//                 </MapContainer>
//             )}
//         </div>
//     );
// };

// export default MechanicPage;
















// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MechanicPage = () => {
//     const location = useLocation();
//     const userLocation = location.state?.userLocation;
//     const [mechanic, setMechanic] = useState(null);

//     useEffect(() => {
//         // Fetch mechanic data from the server
//         const fetchMechanic = async () => {
//             try {
//                 const response = await fetch("http://localhost:3004/api/mechanic"); // Adjust the endpoint as needed
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch mechanic data. Server responded with status: " + response.status);
//                 }
//                 const data = await response.json();
//                 setMechanic(data);
//             } catch (error) {
//                 console.error("Failed to fetch mechanic data", error);
//             }
//         };

//         fetchMechanic();
//     }, []);

//     return (
//         <div>
//             <h2>Mechanic Page</h2>
//             {mechanic && (
//                 <MapContainer center={mechanic.GarageLocation} zoom={13} style={{ height: "600px", width: "100%" }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={mechanic.GarageLocation}>
//                         <Popup>
//                             <strong>{mechanic.Name}</strong><br />
//                             {mechanic.WhatkindofMechanic}<br />
//                             {mechanic.Address}<br />
//                             {mechanic.Email}<br />
//                             {mechanic.Phonenumber}
//                         </Popup>
//                     </Marker>
//                     {userLocation && (
//                         <Marker position={userLocation}>
//                             <Popup>User Location</Popup>
//                         </Marker>
//                     )}
//                 </MapContainer>
//             )}
//         </div>
//     );
// };

// export default MechanicPage;




















import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MapComponent from '../../MapComponent';
import '../mechHome/mechorder.css';

const MechanicPage = () => {
  const [userForms, setUserForms] = useState([]);
  const socket = io('http://localhost:3004');

  useEffect(() => {
    // Ensure socket is only set up once
    socket.on('newUserForm', (form) => {
      console.log('New form received:', form);
      setUserForms((prevForms) => [...prevForms, form]);
    });

    // Fetch existing forms
    fetch('http://localhost:3004/form/getform')
      .then((response) => response.json())
      .then((forms) => {
        setUserForms(forms);
      })
      .catch((error) => console.error('Error fetching user forms:', error));

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="mechanic-container">
      <h1>Mechanic Dashboard</h1>
      <div className="user-forms">
        {userForms.length > 0 ? (
          userForms.map((form, index) => (
            <div key={index} className="user-form">
              <h2>{form.Name}</h2>
              <p>{form.YourVehicle}</p>
              <p>{form.VehicleIssue}</p>
              {form.Livelocation && (
                <MapComponent
                  lat={form.Livelocation.latitude}
                  lng={form.Livelocation.longitude}
                />
              )}
            </div>
          ))
        ) : (
          <p>No user forms available</p>
        )}
      </div>
    </div>
  );
};

export default MechanicPage;













// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MapComponent from '../../MapComponent'; // Correct import path
// import '../mechHome/mechorder.css';

// const MechanicPage = () => {
//   const [userForms, setUserForms] = useState([]);
//   const socket = io('http://localhost:3004');

//   useEffect(() => {
//     socket.on('newUserForm', (form) => {
//       console.log('New form received:', form); // Log form data
//       setUserForms((prevForms) => [...prevForms, form]);
//     });

//     return () => socket.disconnect();
//   }, [socket]);

//   return (
//     <div className="mechanic-container">
//       <h1>Mechanic Dashboard</h1>
//       <div className="user-forms">
//         {userForms.length > 0 ? (
//           userForms.map((form, index) => (
//             <div key={index} className="user-form">
//               <h2>{form.Name}</h2>
//               <p>{form.YourVehicle}</p>
//               <p>{form.VehicleIssue}</p>
//               {form.Livelocation && (
//                 <MapComponent
//                   lat={form.Livelocation.latitude}
//                   lng={form.Livelocation.longitude}
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No user forms available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MechanicPage;











// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MapComponent from '../../MapComponent'; // Correct import path
// import '../mechHome/mechorder.css';

// const MechanicPage = () => {
//   const [userForms, setUserForms] = useState([]);
//   const socket = io('http://localhost:3004');

//   useEffect(() => {
//     socket.on('newForm', (form) => {
//       console.log('New form received:', form); // Log form data
//       setUserForms((prevForms) => [...prevForms, form]);
//     });

//     return () => socket.disconnect();
//   }, [socket]);

//   return (
//     <div className="mechanic-container">
//       <h1>Mechanic Dashboard</h1>
//       <div className="user-forms">
//         {userForms.length > 0 ? (
//           userForms.map((form, index) => (
//             <div key={index} className="user-form">
//               <h2>{form.Name}</h2>
//               <p>{form.YourVehicle}</p>
//               <p>{form.VehicleIssue}</p>
//               {form.Livelocation && (
//                 <MapComponent
//                   lat={form.Livelocation.latitude}
//                   lng={form.Livelocation.longitude}
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No user forms available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MechanicPage;



















// // MechanicPage.js
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MapComponent from '../../GoogleMapComponent';
// import '../mechHome/mechorder.css';

// const MechanicPage = () => {
//   const [userForms, setUserForms] = useState([]);
//   const socket = io('http://localhost:3004');

//   useEffect(() => {
//     socket.on('newForm', (form) => {
//       setUserForms((prevForms) => [...prevForms, form]);
//     });

//     return () => socket.disconnect();
//   }, [socket]);

//   return (
//     <div className="mechanic-container">
//       <h1>Mechanic Dashboard</h1>
//       <div className="user-forms">
//         {userForms.length > 0 ? (
//           userForms.map((form, index) => (
//             <div key={index} className="user-form">
//               <h2>{form.Name}</h2>
//               <p>{form.YourVehicle}</p>
//               <p>{form.VehicleIssue}</p>
//               {form.Livelocation && (
//                 <MapComponent
//                   lat={form.Livelocation.latitude}
//                   lng={form.Livelocation.longitude}
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No user forms available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MechanicPage;



























// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import GoogleMapComponent from './GoogleMapComponent';
// import './MechanicPage.css';

// const MechanicPage = () => {
//     const [userForms, setUserForms] = useState([]);
//     const socket = io('http://localhost:3004');

//     useEffect(() => {
//         const fetchUserForms = async () => {
//             try {
//                 const response = await fetch('http://localhost:3004/form/getform');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user forms');
//                 }
//                 const data = await response.json();
//                 setUserForms(data);
//             } catch (error) {
//                 console.error('Error fetching user forms:', error);
//             }
//         };

//         fetchUserForms();

//         socket.on('newUserLocation', (newForm) => {
//             setUserForms((prevForms) => [...prevForms, newForm]);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [socket]);

//     return (
//         <div className="mechanic-container">
//             <h1>Mechanic Dashboard</h1>
//             <div className="user-forms">
//                 {userForms.length > 0 ? (
//                     userForms.map((form, index) => (
//                         <div key={index} className="user-form">
//                             <p><strong>Name:</strong> {form.Name}</p>
//                             <p><strong>Vehicle:</strong> {form.YourVehicle}</p>
//                             <p><strong>Issue:</strong> {form.VehicleIssue}</p>
//                             {form.Livelocation && (
//                                 <>
//                                     <p><strong>Location:</strong> {form.Livelocation.latitude}, {form.Livelocation.longitude}</p>
//                                     <GoogleMapComponent 
//                                         lat={form.Livelocation.latitude} 
//                                         lng={form.Livelocation.longitude} 
//                                     />
//                                 </>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No user forms available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MechanicPage;

// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const MechanicPage = ({ lat, lng }) => {
//   const center = {
//     lat: parseFloat(lat),
//     lng: parseFloat(lng)
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//       >
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MechanicPage;






// // use///////////////////////////

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import GoogleMapComponent from '../../GoogleMapComponent';
// import '../mechHome/mechorder.css';

// const MechanicPage = () => {
//     const [userForms, setUserForms] = useState([]);
//     const socket = io('http://localhost:3004'); // Ensure the URL matches your server

//     useEffect(() => {
//         // Your existing useEffect code here
//     }, [socket]);

//     return (
//         <div className="mechanic-container">
//             <h1>Mechanic Dashboard</h1>
//             <div className="user-forms">
//                 {userForms.length > 0 ? (
//                     userForms.map((form, index) => (
//                         <div key={index} className="user-form">
//                             {/* Your existing code */}
//                             {form.Livelocation && (
//                                 <>
//                                     {/* Pass lat and lng props to GoogleMapComponent */}
//                                     <GoogleMapComponent 
//                                         lat={form.Livelocation.latitude} 
//                                         lng={form.Livelocation.longitude} 
//                                     />
//                                 </>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No user forms available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MechanicPage;














// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import GoogleMapComponent from '../../GoogleMapComponent';
// import '../mechHome/mechorder.css' // Create a CSS file to style your component

// const MechanicPage = () => {
//     const [userForms, setUserForms] = useState([]);
//     const socket = io('http://localhost:3004'); // Ensure the URL matches your server

//     useEffect(() => {
//         // Fetch initial data from the server
//         const fetchUserForms = async () => {
//             try {
//                 const response = await fetch('http://localhost:3004/form/getform');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user forms');
//                 }
//                 const data = await response.json();
//                 setUserForms(data);
//             } catch (error) {
//                 console.error('Error fetching user forms:', error);
//             }
//         };

//         fetchUserForms();

//         // Set up Socket.IO listener
//         socket.on('newUserLocation', (newForm) => {
//             setUserForms((prevForms) => [...prevForms, newForm]);
//         });

//         // Cleanup on unmount
//         return () => {
//             socket.disconnect();
//         };
//     }, [socket]);

//     return (
//         <div className="mechanic-container">
//             <h1>Mechanic Dashboard</h1>
//             <div className="user-forms">
//                 {userForms.length > 0 ? (
//                     userForms.map((form, index) => (
//                         <div key={index} className="user-form">
//                             <p><strong>Name:</strong> {form.Name}</p>
//                             <p><strong>Vehicle:</strong> {form.YourVehicle}</p>
//                             <p><strong>Issue:</strong> {form.VehicleIssue}</p>
//                             {form.Livelocation && (
//                                 <>
//                                     <p><strong>Location:</strong> {form.Livelocation.latitude}, {form.Livelocation.longitude}</p>
//                                     <GoogleMapComponent 
//                                         lat={form.Livelocation.latitude} 
//                                         lng={form.Livelocation.longitude} 
//                                     />
//                                 </>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No user forms available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MechanicPage;















// // MechanicDashboard.js
// import React, { useEffect, useState } from 'react';
// import socketIOClient from 'socket.io-client';

// const ENDPOINT = "http://localhost:3004";

// const MechanicDashboard = () => {
//     const [userForms, setUserForms] = useState([]);

//     useEffect(() => {
//         const socket = socketIOClient(ENDPOINT);
//         socket.on('newUserForm', (data) => {
//             setUserForms((prevForms) => [...prevForms, data]);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     return (
//         <div>
//             <h1>Mechanic Dashboard</h1>
//             <ul>
//                 {userForms.map((form, index) => (
//                     <li key={index}>
//                         {form.Name} needs help with {form.YourVehicle} at {form.Livelocation.latitude}, {form.Livelocation.longitude}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MechanicDashboard;















// import React from 'react';
// import '../mechHome/mechorder.css'

// const MechanicOrderMessage = ({ order }) => {
//     return (
//         <div className="order-message">
//             <h2>Order Details</h2>
//             <div className="order-detail">
//                 <strong>Customer Name:</strong> {order.name}
//             </div>
//             <div className="order-detail">
//                 <strong>Vehicle:</strong> {order.vehicle}
//             </div>
//             <div className="order-detail">
//                 <strong>Issue:</strong> {order.issue}
//             </div>
//             <div className="order-detail">
//                 <strong>Location:</strong> {order.location}
//             </div>
//             <button className="accept-btn">Accept</button>
//             <button className="decline-btn">Decline</button>
//         </div>
//     );
// };

// export default MechanicOrderMessage;











































// // import React, { useState } from 'react';
// // import '../mechHome/mechorder.css'

// // const BreakdownOrderForm = () => {
// //     const [name, setName] = useState('');
// //     const [vehicle, setVehicle] = useState('');
// //     const [issue, setIssue] = useState('');
// //     const [location, setLocation] = useState('');

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         // Handle form submission logic here
// //         console.log({ name, vehicle, issue, location });
// //     };

// //     return (
// //         <div className="breakdown-order-form">
// //             <h2>Create Breakdown Order</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="form-group">
// //                     <label htmlFor="name">Customer Name:</label>
// //                     <input
// //                         type="text"
// //                         id="name"
// //                         value={name}
// //                         onChange={(e) => setName(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="vehicle">Your Vehicle:</label>
// //                     <input
// //                         type="text"
// //                         id="vehicle"
// //                         value={vehicle}
// //                         onChange={(e) => setVehicle(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="issue">Vehicle Issue:</label>
// //                     <textarea
// //                         id="issue"
// //                         value={issue}
// //                         onChange={(e) => setIssue(e.target.value)}
// //                         required
// //                     ></textarea>
// //                 </div>
// //                 <div className="form-group">
// //                     <label htmlFor="location">Location:</label>
// //                     <input
// //                         type="text"
// //                         id="location"
// //                         value={location}
// //                         onChange={(e) => setLocation(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 <button type="submit" className="submit-btn">Submit Order</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default BreakdownOrderForm;
































// // import React, { useState } from 'react';

// // import '../mechHome/mechorder.css'

// // const BreakdownAssistance = ({ assistance }) => {
// //   const [status, setStatus] = useState(assistance.status);

// //   const handleStatusUpdate = () => {
// //     const newStatus = status === 'On the way' ? 'Assistance Provided' : 'On the way';
// //     setStatus(newStatus);
// //   };

// //   return (
// //     <div className="breakdown-assistance">
// //       <h2>Breakdown Assistance Details</h2>
// //       <div className="assistance-info">
// //         <div className="assistance-item">
// //           <strong>Assistance ID:</strong> {assistance.id}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Customer Name:</strong> {assistance.customerName}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Contact Number:</strong> {assistance.contactNumber}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Car Model:</strong> {assistance.carModel}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Breakdown Location:</strong> {assistance.location}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Mechanic Assigned:</strong> {assistance.mechanicName}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Current Status:</strong> {status}
// //         </div>
// //         <div className="assistance-item">
// //           <strong>Request Date:</strong> {assistance.date}
// //         </div>
// //       </div>
// //       <button className="status-btn" onClick={handleStatusUpdate}>
// //         {status === 'On the way' ? 'Mark as Provided' : 'Mark as On the way'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default BreakdownAssistance;
