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


