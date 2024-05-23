// import React, { useState } from 'react';
// import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState(null);
//     const [locationError, setLocationError] = useState("");

//     const handleSubmit = async (userData) => {
//         try {
//             const response = await fetch("http://localhost:3004/form/createform", {
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
//                     <div className="input-login-user-veh" >
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
//         </div>
//     );
// }








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../User/Userform.css';

export default function Userform() {
    const [Name, setName] = useState("");
    const [YourVehicle, setYourVehicle] = useState("");
    const [VehicleIssue, setVehicleIssue] = useState("");
    const [Livelocation, setLivelocation] = useState(null);
    const [locationError, setLocationError] = useState("");
    const navigate = useNavigate();

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
                // Navigate to mechanic page with user location
                navigate('/mechanicPage', { state: { userLocation: { latitude, longitude } } });
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
                    <div className="input-login-user-veh" >
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
        </div>
    );
}
















































// // import React, { useState } from 'react';
// // import '../User/Userform.css';

// // export default function Userform() {
// //     const [Name, setName] = useState("");
// //     const [YourVehicle, setYourVehicle] = useState("");
// //     const [VehicleIssue, setVehicleIssue] = useState("");
// //     const [Livelocation, setLivelocation] = useState("");
// //     const [locationError, setLocationError] = useState("");

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         const userData = { Name, YourVehicle, VehicleIssue, Livelocation };

// //         if ("geolocation" in navigator) {
// //             navigator.geolocation.getCurrentPosition(async (position) => {
// //                 const { latitude, longitude } = position.coords;
// //                 setLivelocation({ latitude, longitude });

// //                 try {
// //                     const response = await fetch("http://localhost:3004/form/createform", {
// //                         method: "POST",
// //                         headers: {
// //                             "Content-Type": "application/json"
// //                         },
// //                         body: JSON.stringify(userData)
// //                     });

// //                     if (!response.ok) {
// //                         throw new Error("Failed to submit form. Server responded with status: " + response.status);
// //                     }

// //                     const result = await response.json();
// //                     console.log(result);
// //                     alert("Form submitted successfully");
// //                 } catch (error) {
// //                     console.error("Failed to submit form", error);
// //                     alert("Form submission failed");
// //                 }
// //             }, (error) => {
// //                 console.error("Geolocation error:", error);
// //                 setLocationError("Failed to get location: " + error.message);
// //                 alert("Failed to get location");
// //             });
// //         } else {
// //             setLocationError("Geolocation is not supported by this browser");
// //             alert("Geolocation is not supported by this browser");
// //         }
// //     };

// //     const handleSendLocation = () => {
// //         if ("geolocation" in navigator) {
// //             navigator.geolocation.getCurrentPosition((position) => {
// //                 const { latitude, longitude } = position.coords;
// //                 setLivelocation({ latitude, longitude });
// //             }, (error) => {
// //                 console.error("Geolocation error:", error);
// //                 setLocationError("Failed to get location: " + error.message);
// //                 alert("Failed to get location");
// //             });
// //         } else {
// //             setLocationError("Geolocation is not supported by this browser");
// //             alert("Geolocation is not supported by this browser");
// //         }
// //     };

// //     return (
// //         <div className="container-login-user">
// //             <div className="header-login-user">
// //                 <div className="text-login-use-user">Fill the form</div>
// //             </div>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="inputs-login-user">
// //                     <div className="input-login-user">
// //                         <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
// //                     </div>
// //                     <div className="input-login-user">
// //                         <input type="text" placeholder="Your Vehicle" value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} required />
// //                     </div>
// //                     <div className="input-login-user">
// //                         <input type="text" placeholder="Your Vehicle Issue" value={VehicleIssue} onChange={(e) => setVehicleIssue(e.target.value)} required />
// //                     </div>
// //                 </div>
// //                 <div className="user-_login-user">
// //                     <button type="button" onClick={handleSendLocation}>Send Current Location</button>
// //                     <button type="submit" className='login-login-form-user'>Repair Here</button>
// //                 </div>
// //                 {locationError && <p className="error">{locationError}</p>}
// //             </form>
// //         </div>
// //     );
// // }



// import React, { useState } from 'react';
// import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState(null); // Changed to null initially
//     const [locationError, setLocationError] = useState("");

//     const handleSubmit = async (userData) => {
//         try {
//             const response = await fetch("http://localhost:3004/form/createform", {
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
//                 setLocationError(""); // Clear any previous location errors
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
//                     <div className="input-login-user">
//                         <select value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} required>
//                             <option value="" disabled>Select Your Vehicle</option>
//                             <option value="Bike">Bike</option>
//                             <option value="Car">Car</option>
//                             <option value="Three-wheeler">Three-wheeler</option>
//                         </select>
//                     </div>


//                     {/* <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle" value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} required />
//                     </div> */}
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
//         </div>
//     );
// }

















// import React, { useState } from 'react';
// import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState(null); // Changed to null initially
//     const [locationError, setLocationError] = useState("");

//     const handleSubmit = async (userData) => {
//         try {
//             const response = await fetch("http://localhost:3004/form/createform", {
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
//                 setLocationError(""); // Clear any previous location errors
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
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle" value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} required />
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
//         </div>
//     );
// }







//work//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^////







// import React, { useState } from 'react';
// import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState(null); // Changed to null initially
//     const [locationError, setLocationError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userData = { Name, YourVehicle, VehicleIssue, Livelocation };

//         if (!Livelocation) {
//             setLocationError("Location not available. Please provide your location.");
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:3004/form/createform", {
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
//         } catch (error) {
//             console.error("Failed to submit form", error);
//             alert("Form submission failed");
//         }
//     };

//     const handleSendLocation = () => {
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setLivelocation({ latitude, longitude });
//                 setLocationError(""); // Clear any previous location errors
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
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-user">
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle" value={YourVehicle} onChange={(e) => setYourVehicle(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle Issue" value={VehicleIssue} onChange={(e) => setVehicleIssue(e.target.value)} required />
//                     </div>
//                 </div>
//                 <div className="user-_login-user">
//                     {/* <button type="button" onClick={handleSendLocation}>Send Current Location</button> */}
//                     <button type="submit" className='login-login-form-user onClick={handleSendLocation}'  >Repair Here</button>
//                 </div>
//                 {Livelocation && (
//                     <p>Latitude: {Livelocation.latitude}, Longitude: {Livelocation.longitude}</p>
//                 )}
//                 {locationError && <p className="error">{locationError}</p>}
//             </form>
//         </div>
//     );
// }













// use //////////////////////


// import React, { useState } from 'react';
// import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState("");
//     const [locationError, setLocationError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userData = { Name, YourVehicle, VehicleIssue, Livelocation };

//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(async (position) => {
//                 const { latitude, longitude } = position.coords;
//                 userData.Livelocation = { latitude, longitude };

//                 try {
//                     const response = await fetch("http://localhost:3004/form/createform", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(userData)
//                     });

//                     if (!response.ok) {
//                         throw new Error("Failed to submit form. Server responded with status: " + response.status);
//                     }

//                     const result = await response.json();
//                     console.log(result);
//                     alert("Form submitted successfully");
//                 } catch (error) {
//                     console.error("Failed to submit form", error);
//                     alert("Form submission failed");
//                 }
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
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-user">
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle" onChange={(e) => setYourVehicle(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle Issue" onChange={(e) => setVehicleIssue(e.target.value)} required />
//                     </div>
//                 </div>
//                 <div className="user-_login-user">
//                     <button type="submit" className='login-login-form-user'>Repair Here</button>
//                 </div>
//                 {locationError && <p className="error">{locationError}</p>}
//             </form>
//         </div>
//     );
// }
















// // Userform.js
// import React, { useState } from 'react';
// import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userData = { Name, YourVehicle, VehicleIssue, Livelocation };

//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(async (position) => {
//                 const { latitude, longitude } = position.coords;
//                 userData.Livelocation = { latitude, longitude };

//                 try {
//                     const response = await fetch("http://localhost:3004/form/forms", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(userData)
//                     });

//                     if (!response.ok) {
//                         throw new Error("Failed to submit form. Server responded with status: " + response.status);
//                     }

//                     const result = await response.json();
//                     console.log(result);
//                     alert("Form submitted successfully");
//                 } catch (error) {
//                     console.error("Failed to submit form", error);
//                     alert("Form submission failed");
//                 }
//             }, (error) => {
//                 console.error("Geolocation error:", error);
//                 alert("Failed to get location");
//             });
//         } else {
//             alert("Geolocation is not supported by this browser");
//         }
//     };

//     return (
//         <div className="container-login-user">
//             <div className="header-login-user">
//                 <div className="text-login-use-user">Fill the form</div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-user">
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle" onChange={(e) => setYourVehicle(e.target.value)} required />
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle Issue" onChange={(e) => setVehicleIssue(e.target.value)} required />
//                     </div>
//                 </div>
//                 <div className="user-_login-user">
//                     <button type="submit" className='login-login-form-user'>Repair Here</button>
//                 </div>
//             </form>
//         </div>
//     );
// }



















// import React, { useState } from 'react';
// import '../User/Userform.css'

// // import '../User/Userform.css';

// export default function Userform() {
//     const [Name, setName] = useState("");
//     const [YourVehicle, setYourVehicle] = useState("");
//     const [VehicleIssue, setVehicleIssue] = useState("");
//     const [Livelocation, setLivelocation] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userFormData = { Name, YourVehicle, VehicleIssue, Livelocation };

//         try {
//             const response = await fetch("http://localhost:3004/form/forms", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(userFormData)
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to submit form. Server responded with status: " + response.status);
//             }

//             const result = await response.json();
//             console.log(result);

//             alert("Form submitted successfully");
//         } catch (error) {
//             console.error("Failed to submit form", error);
//             alert("Form submission failed");
//         }
//     };

//     return (
//         <div className="container-login-user">
//             <div className="header-login-user">
//                 <div className="text-login-use-user">Fill the form</div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-user">
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle" onChange={(e) => setYourVehicle(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Your Vehicle Issue" onChange={(e) => setVehicleIssue(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-user">
//                         <input type="text" placeholder="Live Location" onChange={(e) => setLivelocation(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className="user-_login-user">
//                     <button className='login-login-form-user' type="submit">Repair Here</button>
//                 </div>
//             </form>
//         </div>
//     );
// }














// import React from 'react'
// import '../User/Userform.css'

// export default function Userform() {

//     return (
//         <div className="container-login-user">
//             <div className="header-login-user">
//                 <div className="text-login-use-user">Fill the form</div>
//                 {/* <div className="underline_login-login"></div> */}

//             </div>
//             <div className="inputs-login-user">
//                 <div className="input-login-user">
//                     {/* <img src="" alt="" /> */}
//                     <input type="text" placeholder="Name" />
//                 </div>
//                 <div className="input-login-user">
//                     {/* <img src="" alt="" /> */}
//                     <input type="text" placeholder="Your Vehicle" />
//                 </div>
//                 <div className="input-login-user">
//                     {/* <img src="" alt="" /> */}
//                     <input type="text" placeholder="Your Vehicle Issue" />
//                 </div>
//                 <div className="input-login-user">
//                     {/* <img src="" alt="" /> */}
//                     <input type="text" placeholder="Live Location" />
//                 </div>
//             </div>
//             {/* <div className="forget_forget-home">Forget Password <span>Click Here!</span></div> */}
//             {/* <div className="user--cointainer"> */}
//                 <div className="user-_login-user"><button className='login-login-form-user'>Repair Here</button></div>
//                 {/* <a href="/userLogin" className="submit_login">Login</a> */}


//             {/* </div> */}

//         </div>
//     )
  




// }
