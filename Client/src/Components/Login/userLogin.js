// import React, { useState } from "react";
// import '../Login/Loginuser.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // Make a POST request to both user and mechanic login endpoints
//             const userResponse = await axios.post("http://localhost:3004/users/login", { Email: email, Password: password });
//             const mechResponse = await axios.post("http://localhost:3004/mech/login", { Email: email, Password: password });

//             // Check if either response is successful
//             if (userResponse.status === 200) {
//                 console.log("User login successful");
//                 navigate('/'); // Navigate to user page
//             } else if (mechResponse.status === 200) {
//                 console.log("Mechanic login successful");
//                 navigate('/Mechpage'); // Navigate to mechanic page
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
            navigate('/admin'); // Navigate to the admin page
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
                const { role, token } = data;

                // Save the token to localStorage
                localStorage.setItem('token', token);

                if (role === "mechanic") {
                    navigate('/Mechpage');
                } else if (role === "user") {
                    navigate('/userForm');
                }
            } else {
                setError("Login failed. Please check your email and password.");
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

//     const adminEmail = "pdinukanth@gmail.com"
//     const adminPassword = "dinu2002"

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
//                 const { role } = data;
//                 if (role === "mechanic") {
//                     navigate('/Mechpage');
//                 } else if (role === "user") {
//                     navigate('/userForm');
//                 }
                

//             } else {
//                 setError("Login failed. Please check your email and password.");
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
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const UserLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         try {
//             const response = await fetch("http://localhost:3004/user/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ Email: email, Password: password }),
//             });
        
//             if (response.ok) {
//                 const data = await response.json();
//                 const { role } = data;
//                 if (role === "mechanic") {
//                     navigate('/');
//                 } else if (role === "user") {
//                     navigate('/Mechpage');
//                 }
//             } else {
//                 setError("Login failed. Please check your email and password.");
//             }
//         } catch (error) {
//             console.error("Failed to login", error);
//             setError("Login failed. Please check your email and password.");
//         }
        

//     //     try {
//     //         const response = await axios.post("http://localhost:3004/login", { Email: email, Password: password });
//     //         // const responsea = await axios.post("http://localhost:3004/mech/login", { Email: email, Password: password });


//     //         if (response.status === 200) {
//     //             const { role } = response.data 
//     //             // = responsea.data;
//     //             if (role === "user") {
//     //                 navigate('/');
//     //             } else if (role === "mechanic") {
//     //                 navigate('/Mechpage');
//     //             }
//     //         }
//     //     } catch (error) {
//     //         console.error("Failed to login", error);
//     //         setError("Login failed. Please check your email and password.");
//     //     }
//     };








// // const UserLogin = () => {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [error, setError] = useState("");
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const response = await axios.post("http://localhost:3004/mech/login", { Email: email, Password: password });

// //             if (response.status === 200) {
// //                 console.log("Login successful");
// //                 navigate('/Mechpage');
// //             }
// //         } catch (error) {
// //             console.error("Failed to login", error);
// //             setError("Login failed. Please check your email and password.");
// //         }
// //     };

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
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:3004/user/login", { Email, Password });
            
//             if (response.status === 200) {
//                 console.log("Login successful");
//                 navigate('/Landpage');
//             } else {
//                 setError(response.data.message);
//                 console.error("Login failed", response.data.message);
//             }
//         } catch (error) {
//             setError("Something went wrong. Please try again.");
//             console.error("Failed to login", error);
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
//                             value={Email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-login">
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={Password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <div className="submit-cointainer_">
//                     <button type="submit" className="submit_log">Login</button>
//                     <a href="/mechLogin" className="submit_log">Sign Up</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UserLogin;







// import React, { useState } from "react";
// import '../Login/Loginuser.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // const Mechdata = { email, password };


//         try {


//             // const responseMechk = await fetch("http://localhost:3004/mech/login", {
//             //     method: "POST",
//             //     headers: {
//             //         "Content-Type": "application/json"
//             //     },
//             //     body: JSON.stringify({email, password})
//             // });  

//             const responseMechk = await axios.post("http://localhost:3004/mech/login", { Email, Password });

//              console.log(responseMechk);


//             if (!responseMechk.ok) {
//                 alert("Login failed");
//             }
//             else{

//               console.log("Login successful");
              
//                 navigate('/Mechpage')



//             }


//             // Login successful, redirect or do something else
//         } catch (error) {
//             console.error("Failed to login", error);
//             // setError(error );
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
//                             value={Email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-login">
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={Password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <div className="submit-cointainer_">
//                     <button type="submit" className="submit_log">Login</button>
//                     <a href="/mechLogin" className="submit_log">Sign Up</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UserLogin;









// import React from "react";
// import '../Login/Loginuser.css'


// const userLogin = () => {
//     return (
//         <div className="container-login" id="us-login-log">
//             <div className="header-login">
//                 <div className="text-login">Login</div>
//                 <div className="underline_login"></div>

//             </div>
//             <div className="inputs-login">
//                 <div className="input-login">
//                     {/* <img src="" alt="" /> */}
//                     <input type="text" placeholder="User Name" />
//                 </div>
//                 <div className="input-login">
//                     {/* <img src="" alt="" /> */}
//                     <input type="email" placeholder="password" />
//                 </div>
               
//             </div>
//             {/* <div className="forget_forget">Forget Password <span>Click Here!</span></div> */}
//             <div className="submit-cointainer_">
//                 <a href="/mechLogin" className="submit_log">Sign Up</a>
//                 <a href="" className="submit_log">Login</a>


//             </div>

//         </div>
//     )

// }

// export default userLogin