import React from "react";
import '../Aboutpage/Aboutpage.css';
import img from '../Aboutpage/Images/img.jpg'; 
import Navbar from "../Navbar/Navbar";

function Aboutpage() {
    return (
        <div>
            {/* <Navbar /> */}
            <div className="dinu-about">
            <div className="about-container">
                <img src={img} alt="Mechanic tools" className="about-image" />
                <div className="about-content">
                    <h1>About Gear Grease</h1>
                    <p>
                        Gear Grease is the solution to your automotive problems,
                        connecting you with mechanics for on-the-spot services.
                        Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
                        Our platform is designed to make vehicle maintenance effortless.
                        Join Mechanic Finder today for a new, stress-free way to keep your
                        vehicle in top condition.
                    </p>
                </div>
            </div>
            <div className="cards-container">
                <div className="card">
                    <div className="card-image spot-work-img"></div>
                    <h2>On-the-Spot Work</h2>
                    <p>Get immediate assistance from mechanics wherever you are.</p>
                </div>
                <div className="card">
                    <div className="card-image nearby-mechanic-img"></div>
                    <h2>Find Nearby Mechanics</h2>
                    <p>Quickly locate reliable mechanics close to your location.</p>
                </div>
                <div className="card">
                    <div className="card-image affordable-services-img"></div>
                    <h2>Affordable Services</h2>
                    <p>Receive high-quality services at reasonable prices.</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Aboutpage;



