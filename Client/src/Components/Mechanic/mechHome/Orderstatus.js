import React, { useState } from 'react';
import axios from 'axios';

const OrderStatus = ({ orderId, currentStatus }) => {
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await axios.put('https://final-project-2vgx.onrender.com/order/status', {
                orderId,
                status: newStatus
            });

            if (response.status === 200) {
                setStatus(newStatus);
                alert('Order status updated successfully');
            } else {
                alert('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        }
    };

    return (
        <div>
            <h3>Order Status</h3>
            <p>Current Status: {status}</p>
            <button onClick={() => handleStatusChange('In Progress')}>Start Repair</button>
            <button onClick={() => handleStatusChange('Completed')}>Complete Repair</button>
        </div>
    );
};

export default OrderStatus;
