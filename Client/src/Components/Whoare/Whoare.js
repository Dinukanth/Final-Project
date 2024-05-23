import React from "react";
import '../Whoare/Whoare.css'
import img0009 from '../Whoare/Image/img0009.jpg'
import img11 from '../Whoare/Image/img11.jpg'
import { HashLink as Link } from "react-router-hash-link";
import { Form } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


function Whoare() {

    return(
        <>
        <Navbar/>
            <div className="signup__mech">
            <div className="img-mech">
            <img src={img0009} alt="img0009.jpg" className="image--img" />
            </div>

            <div className="link-mech-login">
                    <Link to ="/mechLogin" className="mech-mech_login">Register Your Details</Link>
            </div>
            </div>



            <div className="logsign-user">
            <div className="img-user" >
                <div id="imguser">
                <img src={img11} alt="img11.jpg" className="image--img-user" />

                </div>
            </div>

            <div className="link-user-login">
                    <Link to ="/usersignup" className="user-user_login">Register Your Details</Link>
            </div>
            </div>

        </>
    )
    
}
export default Whoare