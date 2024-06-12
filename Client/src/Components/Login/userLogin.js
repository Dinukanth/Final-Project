import React, { useState } from "react";
import '../Login/Loginuser.css';
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const adminEmail = "pdinukanth@gmail.com";
    const adminPassword = "dinu2002";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === adminEmail && password === adminPassword) {
            navigate('/admin');
            return;
        }

        try {
            const response = await fetch("http://localhost:3004/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: email, Password: password })
            });

            if (response.ok) {
                const data = await response.json();
                const { role, token, userId } = data;

                localStorage.setItem('token', token);

                if (role === "mechanic") {
                    localStorage.setItem('mechanicId', userId);
                    navigate('/Mechpage');
                } else if (role === "user") {
                    localStorage.setItem('userId', userId);
                    navigate('/userForm');
                } else {
                    setError("Invalid role received.");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please check your email and password.");
            }
        } catch (error) {
            console.error("Failed to login", error);
            setError("Login failed. Please check your email and password.");
        }
    };

    return (
        <div className="container-login" id="us-login-log">
            <div className="header-login">
                <div className="text-login">Login</div>
                <div className="underline_login"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs-login">
                    <div className="input-login">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-login">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="submit-cointainer_">
                    <button type="submit" className="submit_log">Login</button>
                    <a href="/Who" className="submit_log">Sign Up</a>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
















// import React, { useState } from "react";
// import '../Login/Loginuser.css';
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const adminEmail = "pdinukanth@gmail.com";
//     const adminPassword = "dinu2002";

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (email === adminEmail && password === adminPassword) {
//             navigate('/admin'); // Navigate to the admin page
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:3004/api/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ Email: email, Password: password })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 const { role, token, userId } = data;

//                 // Save the token to localStorage
//                 localStorage.setItem('token', token);

//                 if (role === "mechanic") {
//                     localStorage.setItem('mechanicId', userId);
//                     navigate('/Mechpage');
//                 } else if (role === "user") {
//                     localStorage.setItem('userId', userId);
//                     navigate('/userForm');
//                 } else {
//                     setError("Invalid role received.");
//                 }
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message || "Login failed. Please check your email and password.");
//             }
//         } catch (error) {
//             console.error("Failed to login", error);
//             setError("Login failed. Please check your email and password.");
//         }
//     };

//     return (
//         <div className="container-login" id="us-login-log">
//             <div className="header-login">
//                 <div className="text-login">Login</div>
//                 <div className="underline_login"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login">
//                     <div className="input-login">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-login">
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <div className="submit-cointainer_">
//                     <button type="submit" className="submit_log">Login</button>
//                     <a href="/Who" className="submit_log">Sign Up</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UserLogin;



















// import React, { useState } from "react";
// import '../Login/Loginuser.css';
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const adminEmail = "pdinukanth@gmail.com";
//     const adminPassword = "dinu2002";

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (email === adminEmail && password === adminPassword) {
//         navigate('/admin'); 
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:3004/api/login", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ Email: email, Password: password })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const { role, token, userId } = data;

//             localStorage.setItem('token', token);

//             if (role === "mechanic") {
//                 localStorage.setItem('mechanicId', userId); 
//                 console.log('Mechanic ID set to:', userId); // Debugging line
//                 navigate('/Mechpage');
//             } else if (role === "user") {
//                 localStorage.setItem('userId', userId); // Save userId if needed for regular users
//                 navigate('/userForm');
//             } else {
//                 setError("Invalid role received.");
//             }
//         } else {
//             const errorData = await response.json();
//             setError(errorData.message || "Login failed. Please check your email and password.");
//         }
//     } catch (error) {
//         console.error("Failed to login", error);
//         setError("Login failed. Please check your email and password.");
//     }
// };



//     return (
//         <div className="container-login" id="us-login-log">
//             <div className="header-login">
//                 <div className="text-login">Login</div>
//                 <div className="underline_login"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login">
//                     <div className="input-login">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-login">
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <div className="submit-cointainer_">
//                     <button type="submit" className="submit_log">Login</button>
//                     <a href="/Who" className="submit_log">Sign Up</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UserLogin;





// import React, { useState } from "react";
// import '../Login/Loginuser.css';
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const adminEmail = "pdinukanth@gmail.com";
//     const adminPassword = "dinu2002";

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (email === adminEmail && password === adminPassword) {
//             navigate('/admin'); // Navigate to the admin page
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:3004/api/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ Email: email, Password: password })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 const { role, token, userId } = data;

//                 // Save the token and userId to localStorage
//                 localStorage.setItem('token', token);

//                 if (role === "mechanic") {
//                     localStorage.setItem('mechanicId', userId); // Save mechanicId to localStorage
//                     console.log('Mechanic ID set to:', userId); // Debugging line
//                     navigate('/Mechpage');
//                 } else if (role === "user") {
//                     localStorage.setItem('userId', userId); // Save userId if needed for regular users
//                     navigate('/userForm');
//                 } else {
//                     setError("Invalid role received.");
//                 }
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message || "Login failed. Please check your email and password.");
//             }
//         } catch (error) {
//             console.error("Failed to login", error);
//             setError("Login failed. Please check your email and password.");
//         }
//     };

//     return (
//         <div className="container-login" id="us-login-log">
//             <div className="header-login">
//                 <div className="text-login">Login</div>
//                 <div className="underline_login"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login">
//                     <div className="input-login">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-login">
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <div className="submit-cointainer_">
//                     <button type="submit" className="submit_log">Login</button>
//                     <a href="/Who" className="submit_log">Sign Up</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UserLogin;





