import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';
import '../User/Userform.css';
import NearbyMechanics from '../User/Nearbymechanic';

export default function UserForm() {
    const [Name, setName] = useState("");
    const [YourVehicle, setYourVehicle] = useState("");
    const [VehicleIssue, setVehicleIssue] = useState("");
    const [Livelocation, setLivelocation] = useState(null);
    const [locationError, setLocationError] = useState("");
    const [showNearbyMechanics, setShowNearbyMechanics] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken && decodedToken.Name) {
                    setName(decodedToken.Name);
                }
            } catch (error) {
                console.error("Failed to decode token", error);
            }
        }
    }, []);

    const handleSubmit = async (userData) => {
        try {
            const response = await fetch("https://final-project-2vgx.onrender.com/form/createform", {
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
            toast.success("Form submitted successfully");
            setShowNearbyMechanics(true);
        } catch (error) {
            console.error("Failed to submit form", error);
            toast.error("Form submission failed");
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
                toast.error("Failed to get location: " + error.message);
            });
        } else {
            setLocationError("Geolocation is not supported by this browser");
            toast.error("Geolocation is not supported by this browser");
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
                        <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required disabled/>
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
            <ToastContainer />
        </div>
    );
}





// import React, { useState } from 'react';
// import '../User/Userform.css';
// import NearbyMechanics from '../User/Nearbymechanic'; 

// export default function UserForm() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState(null);
//     const [locationError, setLocationError] = useState("");
//     const [showNearbyMechanics, setShowNearbyMechanics] = useState(false);

//     const handleSubmit = async (userData) => {
//         try {
//             const response = await fetch("https://final-project-2vgx.onrender.com/form/createform", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(userData)
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to submit form. Server responded with status: " + response.status);
//             }

//             const result = await response.json();
//             console.log(result);
//             alert("Form submitted successfully");
//             setShowNearbyMechanics(true); 
//         } catch (error) {
//             console.error("Failed to submit form", error);
//             alert("Form submission failed");
//         }
//     };

//     const handleRepairHere = (e) => {
//         e.preventDefault();

//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setLivelocation({ latitude, longitude });

//                 const userData = { Name, YourVehicle, VehicleIssue, Livelocation: { latitude, longitude } };

//                 handleSubmit(userData);
//                 setLocationError("");
//             }, (error) => {
//                 console.error("Geolocation error:", error);
//                 setLocationError("Failed to get location: " + error.message);
//                 alert("Failed to get location");
//             });
//         } else {
//             setLocationError("Geolocation is not supported by this browser");
//             alert("Geolocation is not supported by this browser");
//         }
//     };

//     return (
//         <div className="container-login-user">
//             <div className="header-login-user">
//                 <div className="text-login-use-user">Fill the form</div>
//             </div>
//             <form onSubmit={handleRepairHere}>
//                 <div className="inputs-login-user">
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user-veh">
//                         <select value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} className='veh' required>
//                             <option value="" disabled>Select Your Vehicle</option>
//                             <option value="Bike">Bike</option>
//                             <option value="Car">Car</option>
//                             <option value="Three-wheeler">Three-wheeler</option>
//                         </select>
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle Issue" value={VehicleIssue} onChange={(e) => setVehicleIssue(e.target.value)} required />
//                     </div>
//                 </div>
//                 <div className="user-_login-user">
//                     <button type="submit" className='login-login-form-user'>Repair Here</button>
//                 </div>
//                 {Livelocation && (
//                     <p>Latitude: {Livelocation.latitude}, Longitude: {Livelocation.longitude}</p>
//                 )}
//                 {locationError && <p className="error">{locationError}</p>}
//             </form>
//             {showNearbyMechanics && Livelocation && (
//                 <NearbyMechanics latitude={Livelocation.latitude} longitude={Livelocation.longitude} />
//             )}
//         </div>
//     );
// }












