import React, { useState } from "react";
import './Navbar.css';
import ggg from '../Navbar/image/ggg.png';
import { HashLink as Link } from "react-router-hash-link";
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [isMobile, setIsMobile] = useState(false);

    const handleToggle = () => {
        setIsMobile(!isMobile);
    };

    return (
        <nav className="navbar">
            <div className="logo-logo">
                <img src={ggg} alt="logo" className="logo-nav"/>
            </div>
            <div className={`align ${isMobile ? "mobile-menu" : ""}`}>
                <Link to="/" className="home-nav-home" onClick={handleToggle}>Home</Link>
                <Link to="/About" className="nav-about" onClick={handleToggle}>About Us</Link>
                <Link to="/Contact" className="nav-contact" onClick={handleToggle}>Contact Us</Link>
                <Link to="/userLogin" className="btn-" onClick={handleToggle}>
                    <button className="btn-nav">Login</button>
                </Link>
            </div>
            <button className="btn-menu" onClick={handleToggle}>
                {isMobile ? <FaTimes /> : <FaBars />}
            </button>
        </nav>
    );
}

export default Navbar;
