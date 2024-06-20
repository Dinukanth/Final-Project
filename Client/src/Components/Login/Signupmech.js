import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MechanicLocation from '../Mechanic/mechHome/Location'; 
import '../Login/Signupmech.css';
import axios from 'axios';

const Signupmech = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
    const [Phonenumber, setPhonenumber] = useState("");
    const [Address, setAddress] = useState("");
    const [GarageLocation, setGarageLocation] = useState(null);
    const [showLocation, setShowLocation] = useState(false);
    const [liveLocation, setLiveLocation] = useState(null);
    const [error, setError] = useState(null);
    const [mechanicId, setMechanicId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGarageLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (err) => {
                    console.error('Error getting user location:', err);
                    setError('Could not fetch location. Please enable location services and try again.');
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Phonenumber.length !== 10) {
            toast.error("Phone number must be exactly 10 digits.");
            return;
        }

        if (!GarageLocation) {
            toast.error("Unable to get your location. Please enable location services and try again.");
            return;
        }

        const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation };

        try {
            const responseMech = await fetch("https://final-project-2vgx.onrender.com/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Mechdata)
            });

            if (!responseMech.ok) {
                const errorText = await responseMech.text();
                throw new Error("Failed to register. Server responded with status: " + responseMech.status + " " + errorText);
            }

            const result = await responseMech.json();
            
            toast.success("Registration successful");
            
            setMechanicId(result.id); 
            setShowLocation(true);
            startTrackingLocation();
            
            setTimeout(() => navigate('/userLogin'), 2000);
        } catch (error) {
            console.error("Failed to register", error);
            toast.error("Registration failed: " + error.message);
        }
    };

    const startTrackingLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                position => {
                    setLiveLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    console.error("Error tracking location", error);
                    toast.error("Unable to track your location.");
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="container-login-mech" id="con-log-mech">
            <div className="header-login-mech">
                <div className="text-login-mech">Mechanic RegisterForm</div>
                <div className="underline_login-mech"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs-login-mech">
                    <div className="input-login-mech">
                        <input type="text" placeholder="User Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="text" placeholder="What type of mechanic" value={WhatkindofMechanic} onChange={(e) => setWhatkindofMechanic(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="text" placeholder="Address" value={Address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="text" placeholder="Phone number" value={Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <div className="submit-container_mech">
                    <button type="submit" className="submit_log-mech" id='dinu'>Sign Up</button>
                    <a href="/userLogin" className="submit_log-mech-log">Login</a>
                </div>
            </form>
            {error && <p className="error">{error}</p>}
            {showLocation && mechanicId && <MechanicLocation mechanicId={mechanicId} />}
            <ToastContainer />
        </div>
    );
};

export default Signupmech;






















