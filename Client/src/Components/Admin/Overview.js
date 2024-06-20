import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/Overview.css'
import { Admin } from './Admin';

const Overview = () => {
    const [userCount, setUserCount] = useState(0);
    const [mechanicCount, setMechanicCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResponse = await axios.get('https://final-project-2vgx.onrender.com/user/get');
                setUserCount(userResponse.data.length);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('An error occurred while fetching user data. Please try again later.');
            }
        };

        const fetchMechanics = async () => {
            try {
                const mechanicResponse = await axios.get('https://final-project-2vgx.onrender.com/mech/get');
                setMechanicCount(mechanicResponse.data.length);
            } catch (error) {
                console.error('Error fetching mechanics:', error);
                setError('An error occurred while fetching mechanic data. Please try again later.');
            }
        };

        fetchUsers();
        fetchMechanics();
    }, []);

    return (



        <>
        <Admin/>
        <div className='dinu'>

        <div className="overview">
            {error && <div className="error-message">{error}</div>}
            <div className="overview-item">
                <h3>Users</h3>
                <p>{userCount}</p>
            </div>
            <div className="overview-item">
                <h3>Mechanics</h3>
                <p>{mechanicCount}</p>
            </div>
            <div className="overview-item">
                <h3>Total</h3>
                <p>{userCount + mechanicCount}</p>
            </div>
        </div>
        </div>

        </>
    );
};

export default Overview;
