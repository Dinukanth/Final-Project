
import React from 'react';
import '../Whoare/Who.css'
import img11 from '../Whoare/Image/img11.jpg'
import img0009 from '../Whoare/Image/img0009.jpg'
import Navbar from '../Navbar/Navbar';
import { HashLink as Link } from "react-router-hash-link";




const Who = () => {
   
    return (

        <>
         <Navbar/>

        <div className='card-margin'>
           

        <div className="first card">
            <img src={img11} alt="img11.jpg" className="image-card" />

            <div className="text_container"></div>
           
            <div className="main_text">
                <p id='text-card-signup'>Registration for the user</p>
            </div>
            
            <div className="card_btn">
                <Link to="/usersignup"><button className='button-card-sign'>Sign Up</button></Link>
            </div>
        </div>

        <div className="first card">
            <img src={img0009} alt="img.jpg" className="image-card" />

            <div className="text_container"></div>
           
            <div className="main_text">
                <p id='text-card-signup'>Registration for the Mechanic</p>
            </div>
           
            <div className="card_btn">
                <Link to="/mechLogin"> <button className='button-card-sign'>Sign Up</button></Link>
            </div>
        </div>




        </div>

        </>

        
    );
};

export default Who;
