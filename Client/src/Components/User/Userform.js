import React, { useState } from 'react';
import '../User/Userform.css';
import NearbyMechanics from '../User/Nearbymechanic'; 

export default function UserForm() {
    const [Name, setName] = useState("");
    const [YourVehicle, setYourVehicle] = useState("");
    const [VehicleIssue, setVehicleIssue] = useState("");
    const [Livelocation, setLivelocation] = useState(null);
    const [locationError, setLocationError] = useState("");
    const [showNearbyMechanics, setShowNearbyMechanics] = useState(false);

    const handleSubmit = async (userData) => {
        try {
            const response = await fetch("http://localhost:3004/form/createform", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit form. Server responded with status: " + response.status);
            }

            const result = await response.json();
            console.log(result);
            alert("Form submitted successfully");
            setShowNearbyMechanics(true); 
        } catch (error) {
            console.error("Failed to submit form", error);
            alert("Form submission failed");
        }
    };

    const handleRepairHere = (e) => {
        e.preventDefault();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLivelocation({ latitude, longitude });

                const userData = { Name, YourVehicle, VehicleIssue, Livelocation: { latitude, longitude } };

                handleSubmit(userData);
                setLocationError("");
            }, (error) => {
                console.error("Geolocation error:", error);
                setLocationError("Failed to get location: " + error.message);
                alert("Failed to get location");
            });
        } else {
            setLocationError("Geolocation is not supported by this browser");
            alert("Geolocation is not supported by this browser");
        }
    };

    return (
        <div className="container-login-user">
            <div className="header-login-user">
                <div className="text-login-use-user">Fill the form</div>
            </div>
            <form onSubmit={handleRepairHere}>
                <div className="inputs-login-user">
                    <div className="input-login-user">
                        <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-login-user-veh">
                        <select value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} className='veh' required>
                            <option value="" disabled>Select Your Vehicle</option>
                            <option value="Bike">Bike</option>
                            <option value="Car">Car</option>
                            <option value="Three-wheeler">Three-wheeler</option>
                        </select>
                    </div>
                    <div className="input-login-user">
                        <input type="text" placeholder="Your Vehicle Issue" value={VehicleIssue} onChange={(e) => setVehicleIssue(e.target.value)} required />
                    </div>
                </div>
                <div className="user-_login-user">
                    <button type="submit" className='login-login-form-user'>Repair Here</button>
                </div>
                {Livelocation && (
                    <p>Latitude: {Livelocation.latitude}, Longitude: {Livelocation.longitude}</p>
                )}
                {locationError && <p className="error">{locationError}</p>}
            </form>
            {showNearbyMechanics && Livelocation && (
                <NearbyMechanics latitude={Livelocation.latitude} longitude={Livelocation.longitude} />
            )}
        </div>
    );
}












