import React, { useState } from 'react';
import MechanicOrders from '../Mechanic/mechHome/mechOrder';
import MechanicMap from '../User/Mechanicmap';

const MainComponent = () => {
    const [orders, setOrders] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [nearbyMechanics, setNearbyMechanics] = useState([]);
    const [showMap, setShowMap] = useState(false);

    const handleUpdate = (orderId, status) => {
        if (status === 'Hired') {
            // Update the state to show the map
            setShowMap(true);
            // Fetch the updated nearby mechanics based on the hired mechanic
            // setNearbyMechanics(updatedMechanics);
        } else if (status === 'Come' || status === 'Decline') {
            // Update the status in the orders array
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status } : order
                )
            );
        }
    };

    return (
        <div>
            <MechanicOrders onUpdate={handleUpdate} />
            {showMap && (
                <MechanicMap
                    latitude={latitude}
                    longitude={longitude}
                    nearbyMechanics={nearbyMechanics}
                    onClose={() => setShowMap(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default MainComponent;
