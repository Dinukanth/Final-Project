import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../mechHome/GarageLocationModal.css'; // Create appropriate CSS for modal

const GarageLocationModal = ({ onClose, onSave }) => {
    const [position, setPosition] = useState([7.8731, 80.7718]); // Default position in Sri Lanka

    const handleMarkerDrag = (e) => {
        setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select Garage Location</h2>
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "400px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                        position={position}
                        draggable={true}
                        eventHandlers={{
                            dragend: handleMarkerDrag,
                        }}
                    ></Marker>
                </MapContainer>
                <button onClick={() => onSave(position)}>Save Location</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default GarageLocationModal;


















// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import './GarageLocationModal.css'; // Create appropriate CSS for modal

// const GarageLocationModal = ({ onClose, onSave }) => {
//     const [position, setPosition] = useState([51.505, -0.09]); // Default position

//     const handleMarkerDrag = (e) => {
//         setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]);
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Select Garage Location</h2>
//                 <MapContainer
//                     center={position}
//                     zoom={13}
//                     style={{ height: "400px", width: "100%" }}
//                 >
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker
//                         position={position}
//                         draggable={true}
//                         eventHandlers={{
//                             dragend: handleMarkerDrag,
//                         }}
//                     ></Marker>
//                 </MapContainer>
//                 <button onClick={() => onSave(position)}>Save Location</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default GarageLocationModal;















// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import '../mechHome/GarageLocationModal.css'; // Create appropriate CSS for modal

// const GarageLocationModal = ({ onClose, onSave }) => {
//     const [position, setPosition] = useState([51.505, -0.09]); // Default position

//     const handleMarkerDrag = (e) => {
//         setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng]);
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Select Garage Location</h2>
//                 <MapContainer
//                     center={position}
//                     zoom={13}
//                     style={{ height: "400px", width: "100%" }}
//                 >
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker
//                         position={position}
//                         draggable={true}
//                         eventHandlers={{
//                             dragend: handleMarkerDrag,
//                         }}
//                     ></Marker>
//                 </MapContainer>
//                 <button onClick={() => onSave(position)}>Save Location</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default GarageLocationModal;







// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import '../mechHome/GarageLocationModal.css'; // Create appropriate CSS for modal

// const GarageLocationModal = ({ onClose, onSave }) => {
//     const [position, setPosition] = useState([51.505, -0.09]); // Default position

//     const handleMapClick = (e) => {
//         // setPosition([e.latlng.lat, e.latlng.lng]);
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Select Garage Location</h2>
//                 <MapContainer
//                     center={position}
//                     zoom={13}
//                     style={{ height: "500px", width: "100%" }}
//                     onClick={handleMapClick}
//                 >
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={position}></Marker>
//                 </MapContainer>
//                 <button onClick={() => onSave(position)}>Save Location</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default GarageLocationModal;
