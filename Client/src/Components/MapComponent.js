// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const MapComponent = ({ lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          I'm Breakdown <br /> Please help
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;













// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//     width: '100%',
//     height: '400px'
// };

// const GoogleMapComponent = ({ lat, lng }) => {
//     const center = {
//         lat: lat,
//         lng: lng
//     };

//     return (
//         <LoadScript
//             googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your actual API key
//         >
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={15}
//             >
//                 <Marker position={center} />
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// export default GoogleMapComponent;
