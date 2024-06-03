





import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGludWFudGgiLCJhIjoiY2x3bmtvaDVrMHl1aTJpbnhoa2c1bmN0cSJ9.Jn4e9SnzSz4vcYxUOsfyqw';

const MechanicMap = ({ location }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null); // UseRef to keep the map instance

    useEffect(() => {
        if (!location || !mapContainerRef.current) return;

        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [location.longitude, location.latitude],
                zoom: 13
            });

            new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .addTo(mapRef.current);
        } else {
            mapRef.current.setCenter([location.longitude, location.latitude]);
        }

    }, [location]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MechanicMap;






// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiZGludWFudGgiLCJhIjoiY2x3bmtvaDVrMHl1aTJpbnhoa2c1bmN0cSJ9.Jn4e9SnzSz4vcYxUOsfyqw';

// const MechanicMap = ({ location }) => {
//     const mapContainerRef = useRef(null);

//     useEffect(() => {
//         if (!location) return;

//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [location.longitude, location.latitude],
//             zoom: 13
//         });

//         new mapboxgl.Marker()
//             .setLngLat([location.longitude, location.latitude])
//             .addTo(map);

//         return () => map.remove();
//     }, [location]);

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MechanicMap;
