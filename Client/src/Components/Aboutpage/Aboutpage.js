import React from "react";
import '../Aboutpage/Aboutpage.css'
import img from './Images/img.jpg'
import img09 from './Images/img09.jpg'
import Navbar from "../Navbar/Navbar";
// import img08 from './Images/img08'

function Aboutpage() {
    return (
        <div>
            <Navbar/>
            <div className="background-about" id="about-home-about">
                <img src={img} alt="img.jpg" className="about-img-image"/>

                {/* <div className="background-about">
                <img src={img08} alt="img08.jpg" /> */}

                {/* <div className="back-back_img_9">
                    <img src={img09} alt="img09.jpg" />

                </div> */}

                <div className="text-overlay">

                    <h1>Mechanic Finder is the solution to your automotive problems,
                        connecting you with mechanics for on-the-spot services.
                        Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
                        Our platform is designed to make vehicle maintenance effortless.
                        Join Mechanic Finder today for a new, stress-free way to keep your
                        vehicle in top condition.
                    </h1>

                </div>
              
            </div>
        </div>
    )
}

export default Aboutpage
