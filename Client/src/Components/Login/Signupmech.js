// import React, { useState } from 'react';
// import '../Login/Signupmech.css';

// const Signupmech = () => {
//     const [Name, setName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
//     const [Phonenumber, setPhonenumber] = useState("");
//     const [Address, setAddress] = useState("");
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLongitude] = useState(null);
//     const [locationError, setLocationError] = useState("");

//     const handleLocationClick = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLatitude(position.coords.latitude);
//                     setLongitude(position.coords.longitude);
//                     alert("Location captured successfully");
//                 },
//                 (error) => {
//                     console.error('Error getting location:', error);
//                     setLocationError("Failed to get location: " + error.message);
//                 }
//             );
//         } else {
//             setLocationError("Geolocation is not supported by this browser");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const Mechdata = { 
//             Name, 
//             Email, 
//             Password, 
//             WhatkindofMechanic, 
//             Phonenumber, 
//             Address,
//             latitude,
//             longitude
//         };

//         try {
//             const responseMech = await fetch("http://localhost:3004/api/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(Mechdata)
//             });

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register. Server responded with status: " + responseMech.status);
//             }

//             const result = await responseMech.json();
//             console.log(result);

//             alert("Registration successful");
//         } catch (error) {
//             console.error("Failed to register", error);
//             alert("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="What type of mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Phone number" onChange={(e) => setPhonenumber(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Confirm Password" />
//                     </div>
//                     <button type="button" className="location-button" onClick={handleLocationClick}>
//                         Share your shop location
//                     </button>
//                     {latitude && longitude && (
//                         <div className="location-info">
//                             <p>Location: {latitude}, {longitude}</p>
//                         </div>
//                     )}
//                     {locationError && <p className="error">{locationError}</p>}
//                 </div>
//                 <div className="submit-cointainer_mech">
//                     <button type="submit" className="submit_log-mech">Sign Up</button>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Signupmech;



import React, { useState } from 'react';
import '../Login/Signupmech.css';
import GarageLocationModal from '../Mechanic/mechHome/GarageLocationModal'; // Ensure correct path

const Signupmech = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
    const [Phonenumber, setPhonenumber] = useState("");
    const [Address, setAddress] = useState("");
    const [GarageLocation, setGarageLocation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation };

        try {
            const responseMech = await fetch("http://localhost:3004/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Mechdata)
            });

            if (!responseMech.ok) {
                throw new Error("Failed to register. Server responded with status: " + responseMech.status);
            }

            const result = await responseMech.json();
            console.log(result);

            alert("Registration successful");
        } catch (error) {
            console.error("Failed to register", error);
            alert("Registration failed");
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
                        <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="tel" placeholder="What type of mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="text" placeholder="Phone number" onChange={(e) => setPhonenumber(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="input-login-mech">
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                </div>
                <div className="submit-container_mech">
                    <button type="button" className="submit_log-mech" onClick={() => setIsModalOpen(true)}>Set Garage Location</button>
                    <button type="submit" className="submit_log-mech">Sign Up</button>
                    <a href="/userLogin" className="submit_log-mech">Login</a>
                </div>
            </form>
            {isModalOpen && (
                <GarageLocationModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={(location) => {
                        setGarageLocation(location);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default Signupmech;





// import React, { useState } from 'react';
// import GarageLocationModal from '../Mechanic/mechHome/GarageLocationModal'; // Ensure the correct path
// import '../Login/Signupmech.css';

// const Signupmech = () => {
//     const [Name, setName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
//     const [Phonenumber, setPhonenumber] = useState("");
//     const [Address, setAddress] = useState("");
//     const [GarageLocation, setGarageLocation] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation };

//         try {
//             const responseMech = await fetch("http://localhost:3004/api/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(Mechdata)
//             });

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register. Server responded with status: " + responseMech.status);
//             }

//             const result = await responseMech.json();
//             console.log(result);

//             alert("Registration successful");
//         } catch (error) {
//             console.error("Failed to register", error);
//             alert("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="tel" placeholder="What type mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Phonenumber" onChange={(e) => setPhonenumber(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Confirm Password" />
//                     </div>
//                 </div>
//                 <div className="submit-cointainer_mech">
//                     <button type="button" className="submit_log-mech" onClick={() => setIsModalOpen(true)}>Set Garage Location</button>
//                     <button type="submit" className="submit_log-mech">Sign Up</button>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>
//                 </div>
//             </form>
//             {isModalOpen && (
//                 <GarageLocationModal
//                     onClose={() => setIsModalOpen(false)}
//                     onSave={(location) => {
//                         setGarageLocation(location);
//                         setIsModalOpen(false);
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// export default Signupmech;

















































// import React, { useState } from 'react';
// import '../Login/Signupmech.css';
// import GarageLocationModal from '../Mechanic/mechHome/GarageLocationModal'; // Ensure correct path

// const Signupmech = () => {
//     const [Name, setName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
//     const [Phonenumber, setPhonenumber] = useState("");
//     const [Address, setAddress] = useState("");
//     const [GarageLocation, setGarageLocation] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation };

//         try {
//             const responseMech = await fetch("http://localhost:3004/api/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(Mechdata)
//             });

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register Server responded with status: " + responseMech.status);
//             }

//             const result = await responseMech.json();
//             console.log(result);

//             alert("Registration successful");
//         } catch (error) {
//             console.error("Failed to register", error);
//             alert("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="tel" placeholder="What type mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Phonenumber" onChange={(e) => setPhonenumber(e.target.value)} required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Confirm Password" />
//                     </div>
//                 </div>
//                 <div className="submit-cointainer_mech">
//                     <button type="button" className="submit_log-mech" onClick={() => setIsModalOpen(true)}>Set Garage Location</button>
//                     <button type="submit" className="submit_log-mech">Sign Up</button>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>
//                 </div>
//             </form>
//             {isModalOpen && (
//                 <GarageLocationModal
//                     onClose={() => setIsModalOpen(false)}
//                     onSave={(location) => {
//                         setGarageLocation(location);
//                         setIsModalOpen(false);
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// export default Signupmech;










// import React, { useState } from 'react';
// import '../Login/Signupmech.css';
// import GarageLocationModal from '../Mechanic/mechHome/GarageLocationModal'; // Ensure correct path

// const Signupmech = () => {
//     const [Name, setName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
//     const [Phonenumber, setPhonenumber] = useState("");
//     const [Address, setAddress] = useState("");
//     const [GarageLocation, setGarageLocation] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, latitude: GarageLocation?.latitude, longitude: GarageLocation?.longitude };


//         // const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation };

//         try {
//             const responseMech = await fetch("http://localhost:3004/api/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(Mechdata)
//             });

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register Server responded with status: " + responseMech.status);
//             }

//             const result = await responseMech.json();
//             console.log(result);

//             alert("Registration successful");
//         } catch (error) {
//             console.error("Failed to register", error);
//             alert("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="tel" placeholder="What type mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Phonenumber" onChange={(e) => setPhonenumber(e.target.value)}required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Confirm Password" />
//                     </div>
//                 </div>
//                 <div className="submit-cointainer_mech">
//                     <button type="button" className="submit_log-mech" onClick={() => setIsModalOpen(true)}>Set Garage Location</button>
//                     <button type="submit" className="submit_log-mech">Sign Up</button>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>
//                 </div>
//             </form>
//             {isModalOpen && (
//                 <GarageLocationModal
//                     onClose={() => setIsModalOpen(false)}
//                     onSave={(location) => {
//                         setGarageLocation(location);
//                         setIsModalOpen(false);
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// export default Signupmech;






//work/////..<<>>><



// import React, { useState } from 'react';
// import '../Login/Signupmech.css';
// import GarageLocationModal from '../Mechanic/mechHome/GarageLocationModal'; // Import the modal component

// const Signupmech = () => {
//     const [Name, setName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
//     const [Phonenumber, setPhonenumber] = useState("");
//     const [Address, setAddress] = useState("");
//     const [GarageLocation, setGarageLocation] = useState(null); // Add state for garage location
//     const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address, GarageLocation };

//         try {
//             const responseMech = await fetch("http://localhost:3004/api/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(Mechdata)
//             });

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register Server responded with status: " + responseMech.status);
//             }

//             const result = await responseMech.json();
//             console.log(result);

//             alert("Registration successful");
//         } catch (error) {
//             console.error("Failed to register", error);
//             alert("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="tel" placeholder="What type mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Phonenumber" onChange={(e) => setPhonenumber(e.target.value)}required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Confirm Password" />
//                     </div>
//                 </div>
//                 <div className="submit-cointainer_mech">
//                     <button type="button" className="submit_log-mech" onClick={() => setIsModalOpen(true)}>Set Garage Location</button>
//                     <button type="submit" className="submit_log-mech">Sign Up</button>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>
//                 </div>
//             </form>
//             {isModalOpen && (
//                 <GarageLocationModal
//                     onClose={() => setIsModalOpen(false)}
//                     onSave={(location) => {
//                         setGarageLocation(location);
//                         setIsModalOpen(false);
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// export default Signupmech;













// import React, { useState } from 'react';
// import '../Login/Signupmech.css';

// const Signupmech = () => {
//     const [Name, setName] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("");
//     const [Phonenumber, setPhonenumber] = useState("");
//     const [Address, setAddress] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address };

//         try {
//             const responseMech = await fetch("http://localhost:3004/api/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(Mechdata)
//             });

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register Server responded with status: " + responseMech.status);
//             }

//             const result = await responseMech.json();
//             console.log(result);

//             alert("Registration successful");
//         } catch (error) {
//             console.error("Failed to register", error);
//             alert("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="tel" placeholder="What type mechanic" onChange={(e) => setWhatkindofMechanic(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="text" placeholder="Phonenumber" onChange={(e) => setPhonenumber(e.target.value)}required />
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
//                     </div>
//                     <div className="input-login-mech">
//                         <input type="password" placeholder="Confirm Password" />
//                     </div>
//                 </div>
//                 <div className="submit-cointainer_mech">
//                     <button type="submit" className="submit_log-mech">Sign Up</button>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Signupmech;







// import React, { useState } from 'react';

// import '../Login/Signupmech.css'

// const Signupmech = () => {


//     const [Name, setName] = useState("")
//     const [Email, setEmail] = useState("")
//     const [Password, setPassword] = useState("")
//     const [WhatkindofMechanic, setWhatkindofMechanic] = useState("")
//     const [Phonenumber, setPhonenumber] = useState("")
//     const [Address, setAddress] = useState("")

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const Mechdata = { Name, Email, Password, WhatkindofMechanic, Phonenumber, Address }

//         try {
//             const responseMech = await fetch("http://localhost:3004/mech/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content- Type": "application/json",

//                 },
//                 body: JSON.stringify(Mechdata),


//             })

//             if (!responseMech.ok) {
//                 throw new Error("Failed to register Server responded with status: " + responseMech.status)
//             }

//             const result = await responseMech.json()
//             console.log(result);

//             alert("Registeration successful ")


//         }
//         catch (error) {
//             console.error("Failed to register", error);
//             alert("Register failed")
//         }

//     }

//     return (

//         <div className="container-login-mech" id="con-log-mech">
//             <div className="header-login-mech">
//                 <div className="text-login-mech">Mechanic RegisterForm</div>
//                 <div className="underline_login-mech"></div>

//             </div>
//             <form onSubmit={handleSubmit}>

//                 <div className="inputs-login-mech">
//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="text" placeholder="User Name"
//                             onChange={(e) => setName(e.target.value)}

//                         />
//                     </div>
//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="tel" placeholder="What type mechanic"
//                             onChange={(e) => setWhatkindofMechanic(e.target.value)}


//                         />
//                     </div>
//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="text" placeholder="Address"
//                             onChange={(e) => setAddress(e.target.value)}


//                         />
//                     </div>
//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="email" placeholder="Email"
//                             onChange={(e) => setEmail(e.target.value)}


//                         />
//                     </div>

//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="text" placeholder="Phonenumber"
//                             onChange={(e) => setPhonenumber(e.target.value)}


//                         />
//                     </div>


//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="password" placeholder="Password"
//                             onChange={(e) => setPassword(e.target.value)}

//                         />
//                     </div>
//                     <div className="input-login-mech">
//                         {/* <img src="" alt="" /> */}
//                         <input type="password" placeholder="Confirm Password"

//                         />
//                     </div>
//                 </div>
//                 {/* <div className="forget_forget">Forget Password <span>Click Here!</span></div> */}
//                 <div className="submit-cointainer_mech">
//                     <a href="" className="submit_log-mech">Sign Up</a>
//                     <a href="/userLogin" className="submit_log-mech">Login</a>


//                 </div>
//             </form>


//         </div>
//     )
// }



// export default Signupmech









    //   const [formData, setFormData] = useState({
    //     username: '',
    //     type: '',
    //     location: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    //   });

    //   const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //   };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //       const response = await fetch('http://localhost:3004/signup', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };

    //   return (
    //     <div className="container-login-mech" id="con-log-mech">
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="text"
    //           name="username"
    //           placeholder="User Name"
    //           value={formData.username}
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="text"
    //           name="type"
    //           placeholder="What type mechanic"
    //           value={formData.type}
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="text"
    //           name="location"
    //           placeholder="Location"
    //           value={formData.location}
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Email"
    //           value={formData.email}
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           value={formData.password}
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="password"
    //           name="confirmPassword"
    //           placeholder="Confirm Password"
    //           value={formData.confirmPassword}
    //           onChange={handleChange}
    //         />
    //         <button type="submit">Sign Up</button>
    //       </form>
    //     </div>
    //   );
    // };
