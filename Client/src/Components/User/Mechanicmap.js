// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import './MechanicMap.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const MechanicMap = ({ latitude, longitude, nearbyMechanics, onClose, onUpdate }) => {
//     const [hiredMechanic, setHiredMechanic] = useState(null);
//     const [status, setStatus] = useState(null);

//     const handleHire = (mechanic) => {
//         setHiredMechanic(mechanic);
//         setStatus('Hired');
//         onUpdate && onUpdate(mechanic._id, 'Hired');
//     };

//     const handleAccept = (mechanic) => {
//         setStatus('Come');
//         onUpdate && onUpdate(mechanic._id, 'Come');
//     };

//     const handleDecline = () => {
//         setStatus(null);
//         setHiredMechanic(null);
//         onUpdate && onUpdate(null, 'Decline');
//     };

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={onClose}>&times;</span>
//                 <MapContainer center={[latitude, longitude]} zoom={13} className="map">
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
//                                     {status === 'Hired' && hiredMechanic._id === mechanic._id ? (
//                                         <>
//                                             <button onClick={() => handleAccept(mechanic)}>Come</button>
//                                             <button onClick={handleDecline}>Decline</button>
//                                         </>
//                                     ) : (
//                                         <button onClick={() => handleHire(mechanic)}>Hire</button>
//                                     )}
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             </div>
//         </div>
//     );
// };

// export default MechanicMap;

























import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MechanicMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MechanicMap = ({ latitude, longitude, nearbyMechanics, onClose, onHire }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <MapContainer center={[latitude, longitude]} zoom={13} className="map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                                    <button onClick={() => onHire(mechanic)}>Hire</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MechanicMap;
