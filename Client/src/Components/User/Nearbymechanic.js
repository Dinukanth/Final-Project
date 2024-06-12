
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../User/Nearbymechanic.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NearbyMechanics = ({ latitude, longitude }) => {
    const [nearbyMechanics, setNearbyMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [hiredMechanic, setHiredMechanic] = useState(null);

    useEffect(() => {
        const fetchNearbyMechanics = async () => {
            try {
                const response = await axios.post('http://localhost:3004/form/findnearbymechanics', {
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
            const response = await axios.post('http://localhost:3004/mech/hire', {
                mechanicId: mechanic._id,
                userLatitude: latitude,
                userLongitude: longitude
            });

            if (response.status === 200) {
                alert('Mechanic hired successfully');
                setHiredMechanic(mechanic);
                setShowMap(false);
            } else {
                alert('Failed to hire mechanic');
            }
        } catch (error) {
            console.error('Failed to hire mechanic', error);
            alert('Failed to hire mechanic');
        }
    };

    return (
        <div>
            <h2>Nearby Mechanics</h2>
            <button onClick={() => setShowMap(true)}>
                {hiredMechanic ? `Hired: ${hiredMechanic.Name}` : 'Show Map'}
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {showMap && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setShowMap(false)}>&times;</span>
                                <MapContainer center={[latitude, longitude]} zoom={13} className="map">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[latitude, longitude]}>
                                        <Popup>You are here</Popup>
                                    </Marker>
                                    {nearbyMechanics.map(mechanic => (
                                        <Marker key={mechanic._id} position={[mechanic.latitude, mechanic.longitude]}>
                                            <Popup>
                                                <div>
                                                    <h3>{mechanic.Name}</h3>
                                                    <p>{mechanic.Address}</p>
                                                    <p>Type: {mechanic.WhatkindofMechanic}</p>
                                                    <p>Phone: {mechanic.Phonenumber}</p>
                                                    <p>Distance: {mechanic.distance.toFixed()} km</p>
                                                    <button onClick={() => handleHire(mechanic)}>Hire</button>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NearbyMechanics;























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
//                 const response = await axios.post('http://localhost:3004/form/findnearbymechanics', {
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
//                 const response = await axios.get('http://localhost:3004/form/getUserFormDetails', {
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
//             const response = await axios.post('http://localhost:3004/mech/hire', {
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
                // const response = await axios.post('http://localhost:3004/form/findnearbymechanics', {
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
            // const response = await axios.post('http://localhost:3004/mech/hire', {
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
//                 const response = await axios.post('http://localhost:3004/form/findnearbymechanics', {
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
//             const response = await axios.post('http://localhost:3004/mech/hire', {
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
//                 const response = await axios.post('http://localhost:3004/form/findnearbymechanics', {
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
//             const response = await axios.post('http://localhost:3004/mech/hire', {
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
//                 const response = await axios.post('http://localhost:3004/form/findnearbymechanics', {
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
//             const response = await axios.post('http://localhost:3004/mech/hire', {
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

