// import React, { useState, useEffect } from 'react';
// import MapGL, { Marker } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '../mechHome/GarageLocationModal.css';

// const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN-NEW

// const GarageLocationModal = ({ onClose, onSave }) => {
//     const [viewport, setViewport] = useState({
//         latitude: 7.8731,
//         longitude: 80.7718,
//         zoom: 13,
//         width: '100%',
//         height: '400px'
//     });
//     const [marker, setMarker] = useState({
//         latitude: 7.8731,
//         longitude: 80.7718
//     });

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setViewport((prevViewport) => ({
//                     ...prevViewport,
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 }));
//                 setMarker({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 });
//             },
//             (error) => console.error('Error getting user location:', error)
//         );
//     }, []);

//     const handleMarkerDragEnd = (event) => {
//         setMarker({
//             latitude: event.lngLat[1],
//             longitude: event.lngLat[0]
//         });
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Select Garage Location</h2>
//                 <MapGL
//                     {...viewport}
//                     mapboxApiAccessToken={MAPBOX_TOKEN}
//                     onViewportChange={(newViewport) => setViewport(newViewport)}
//                 >
//                     <Marker
//                         latitude={marker.latitude}
//                         longitude={marker.longitude}
//                         draggable
//                         onDragEnd={handleMarkerDragEnd}
//                     >
//                         <div style={{ color: 'red' }}>📍</div>
//                     </Marker>
//                 </MapGL>
//                 <button onClick={() => onSave([marker.latitude, marker.longitude])}>Save Location</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default GarageLocationModal;

















// import React, { useState, useEffect } from 'react';
// import MapGL, { Marker } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '../mechHome/GarageLocationModal.css';

// const MAPBOX_TOKEN = 'your-mapbox-token';

// const GarageLocationModal = ({ onClose, onSave }) => {
//     const [viewport, setViewport] = useState({
//         latitude: 7.8731,
//         longitude: 80.7718,
//         zoom: 13,
//         width: '100%',
//         height: '400px'
//     });
//     const [marker, setMarker] = useState({
//         latitude: 7.8731,
//         longitude: 80.7718
//     });

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setViewport({
//                     ...viewport,
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 });
//                 setMarker({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 });
//             },
//             (error) => console.error('Error getting user location:', error)
//         );
//     }, []);

//     const handleMarkerDragEnd = (event) => {
//         setMarker({
//             latitude: event.lngLat[1],
//             longitude: event.lngLat[0]
//         });
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Select Garage Location</h2>
//                 <MapGL
//                     {...viewport}
//                     mapboxApiAccessToken={MAPBOX_TOKEN}
//                     onViewportChange={(newViewport) => setViewport(newViewport)}
//                 >
//                     <Marker
//                         latitude={marker.latitude}
//                         longitude={marker.longitude}
//                         draggable
//                         onDragEnd={handleMarkerDragEnd}
//                     >
//                         <div>You are here</div>
//                     </Marker>
//                 </MapGL>
//                 <button onClick={() => onSave([marker.latitude, marker.longitude])}>Save Location</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default GarageLocationModal;






































// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import '../mechHome/GarageLocationModal.css';

// const GarageLocationModal = ({ onClose, onSave }) => {
//     const [position, setPosition] = useState([7.8731, 80.7718]); // Default position in Sri Lanka

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
//     const [position, setPosition] = useState([7.8731, 80.7718]); // Default position in Sri Lanka

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
