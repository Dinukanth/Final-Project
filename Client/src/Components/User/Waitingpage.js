import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../User/waiting.css';
import Spinner from './spinner';

const Waiting = () => {
    const [lastOrder, setLastOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLastOrder = async () => {
            try {
                const response = await axios.get('https://final-project-2vgx.onrender.com/mech/Orders');
                const orders = response.data;
                if (orders.length > 0) {
                    setLastOrder(orders[orders.length - 1]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch orders', error);
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchLastOrder();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!lastOrder) {
        return <p>No orders found.</p>;
    }

    const renderStatusMessage = (status) => {
        switch (status) {
            case 'Pending':
                return (
                    <>
                        <p>Waiting for mechanic response...</p>
                        <div className="spinner"></div>
                    </>
                );
            case 'Accepted':
                return (
                    <>
                        <p>Mechanic will come. Please wait...</p>
                        <div className="thumbs-up">👍</div>
                    </>
                );
            case 'Declined':
                return (
                    <>
                        <p>Sorry, please select another mechanic.</p>
                        <div className="thumbs-down">👎</div>
                    </>
                );
            default:
                return 'Unknown status.';
        }
    };

    return (
        <div className="waiting-container">
            <div className="waiting-card">
                <h2>Order Status</h2>
                <p>Mechanic Name: {lastOrder.mechanicName}</p>
                <p>Status: {lastOrder.status}</p>
                <p>{renderStatusMessage(lastOrder.status)}</p>
            </div>
        </div>
    );
};

export default Waiting;

