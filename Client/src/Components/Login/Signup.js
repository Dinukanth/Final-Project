import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Login/Signup.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Loginhome = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3004/api/signup', { Name: name, Email: email, Password: password });

            if (response.status === 201) {
                toast.success("Registration successful");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    navigate('/userLogin');
                }, 2000); // Navigate after 2 seconds
            } else {
                toast.error("Registration failed");
            }
        } catch (err) {
            console.error("Failed to register", err);
            toast.error("Registration failed");
        }
    };

    return (
        <div className="container-login-login">
            <div className="header-login_login">
                <div className="text-login_login">Sign Up</div>
                <div className="underline_login-login"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs-login_login">
                    <div className="input-login_login">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-login_login">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-login_login">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <i 
                            className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`} 
                            onClick={() => setPasswordVisible(!passwordVisible)} 
                        ></i>
                    </div>
                    <div className="input-login_login">
                        <input 
                            type={confirmPasswordVisible ? "text" : "password"} 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                        <i 
                            className={`fas ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} 
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                        ></i>
                    </div>
                </div>
                <div className="submit-cointainer">
                    <button type="submit" className="submit_login">Sign Up</button>
                    <a href="/userLogin" className="submit_login">Login</a>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Loginhome;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import '../Login/Signup.css'
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Loginhome = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             toast.error("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3004/api/signup', { Name: name, Email: email, Password: password });

//             if (response.status === 201) {
//                 toast.success("Registration successful");
//                 setName("");
//                 setEmail("");
//                 setPassword("");
//                 setConfirmPassword("");
//                 setTimeout(() => {
//                     navigate('/userLogin');
//                 }, 2000); // Navigate after 2 seconds
//             } else {
//                 toast.error("Registration failed");
//             }
//         } catch (err) {
//             console.error("Failed to register", err);
//             toast.error("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-login">
//             <div className="header-login_login">
//                 <div className="text-login_login">Sign Up</div>
//                 <div className="underline_login-login"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login_login">
//                     <div className="input-login_login">
//                         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login_login">
//                         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="input-login_login">
//                         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div className="input-login_login">
//                         <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     </div>
//                 </div>
//                 <div className="submit-cointainer">
//                     <button type="submit" className="submit_login">Sign Up</button>
//                     <a href="/userLogin" className="submit_login">Login</a>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Loginhome;






















// import React, { useState } from "react";
// import '../Login/Signup.css'
// import axios from 'axios';

// const Loginhome = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3004/api/signup', { Name: name, Email: email, Password: password });

//             if (response.status === 201) {
//                 setSuccess("Registration successful");
//                 setName("");
//                 setEmail("");
//                 setPassword("");
//                 setConfirmPassword("");
//             } else {
//                 setError("Registration failed");
//             }
//         } catch (err) {
//             console.error("Failed to register", err);
//             setError("Registration failed");
//         }
//     };

//     return (
//         <div className="container-login-login">
//             <div className="header-login_login">
//                 <div className="text-login_login">Sign Up</div>
//                 <div className="underline_login-login"></div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="inputs-login_login">
//                     <div className="input-login_login">
//                         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="input-login_login">
//                         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="input-login_login">
//                         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div className="input-login_login">
//                         <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     </div>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 {success && <div className="success-message">{success}</div>}
//                 <div className="submit-cointainer">
//                     <button type="submit" className="submit_login">Sign Up</button>
//                     <a href="/userLogin" className="submit_login">Login</a>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Loginhome;







































// import React, { useState } from "react";
// import '../Login/Signup.css'
// import axios from 'axios'

// const Loginhome = () => {

//     const [Name, setName] = useState()
//     const [Email, setEmail] = useState()
//     const [Password, setPassword] = useState()





//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3004/User', { Name, Email, Password })
//             .then(result => console.log(result))
//             .catch(err => console.log(err))
//     }



//     return (
//         <div className="container-login-login">
//             <div className="header-login_login">
//                 <div className="text-login_login">Sign Up</div>
//                 <form onSubmit={handleSubmit}></form>
//                 <div className="underline_login-login"></div>

//             </div>
//             <div className="inputs-login_login">
//                 <div className="input-login_login">
//                     {/* <img src="" alt="" /> */}
//                     <input type="text" placeholder="Name"

//                         onChange={(e) => setName(e.target.value)}


//                     />


//                 </div>
//                 <div className="input-login_login">

//                     {/* <img src="" alt="" /> */}
//                     <input type="email" placeholder="Email"

//                         onChange={(e) => setEmail(e.target.value)}


//                     />





//                 </div>
//                 <div className="input-login_login">
//                     {/* <img src="" alt="" /> */}
//                     <input type="password" placeholder="Password"
//                         onChange={(e) => setPassword(e.target.value)}


//                     />




//                 </div>
//                 <div className="input-login_login">
//                     {/* <img src="" alt="" /> */}
//                     <input type="password" placeholder="Confirm Password" />
//                 </div>
//             </div>
//             {/* <div className="forget_forget-home">Forget Password <span>Click Here!</span></div> */}
//             <div className="submit-cointainer">
//                 <div className="submit_login">Sign Up</div>
//                 <a href="/userLogin" className="submit_login">Login</a>


//             </div>

//         </div>
//     )



// }
// export default Loginhome