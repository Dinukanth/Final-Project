import React, { useEffect, useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGludWFudGgiLCJhIjoiY2x3bmtvaDVrMHl1aTJpbnhoa2c1bmN0cSJ9.Jn4e9SnzSz4vcYxUOsfyqw';

const MechanicLocations = () => {
    const [mechanics, setMechanics] = useState([]);
    const [viewport, setViewport] = useState({
        latitude: 7.8731,
        longitude: 80.7718,
        zoom: 6,
        width: '100%',
        height: '600px'
    });

    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await fetch("https://final-project-2vgx.onrender.com/mechanic/get");
                const data = await response.json();
                setMechanics(data);
            } catch (error) {
                console.error("Failed to fetch mechanics", error);
            }
        };

        fetchMechanics();
    }, []);

    return (
        <div>
            <h1>Mechanic Locations</h1>
            <MapGL
                {...viewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={newViewport => setViewport(newViewport)}
            >
                {mechanics.map(mechanic => (
                    <Marker
                        key={mechanic._id}
                        latitude={mechanic.latitude}
                        longitude={mechanic.longitude}
                    >
                        <div style={{ color: 'red' }}>📍</div>
                    </Marker>
                ))}
            </MapGL>
        </div>
    );
};

export default MechanicLocations;
