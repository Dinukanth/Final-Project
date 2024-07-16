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
            const response = await axios.post('https://final-project-2vgx.onrender.com/api/signup', { Name: name, Email: email, Password: password });

            if (response.status === 201) {
                toast.success("Registration successful");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    navigate('/userLogin');
                }, 2000); 
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

