import React, { useState } from "react";
import '../Login/Loginuser.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const response = await fetch("https://final-project-2vgx.onrender.com/api/login", {
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
                    toast.success("Login successful! ");
                    setTimeout(() => navigate('/Mechpage'), 2000);
                } else if (role === "user") {
                    localStorage.setItem('userId', userId);
                    toast.success("Login successful! ");
                    setTimeout(() => navigate('/userForm'), 2000);
                } else {
                    setError("Invalid role received.");
                    toast.error("Invalid role received.");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please check your email and password.");
                toast.error(errorData.message || "Login failed. Please check your email and password.");
            }
        } catch (error) {
            console.error("Failed to login", error);
            setError("Login failed. Please check your email and password.");
            toast.error("Login failed. Please check your email and password.");
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
            <ToastContainer />
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
//             navigate('/admin');
//             return;
//         }

//         try {
//             const response = await fetch("https://final-project-2vgx.onrender.com/api/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ Email: email, Password: password })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 const { role, token, userId } = data;

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

