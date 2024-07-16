import React from 'react';
import backgroundImage from './hand-car-mechanic-with-wrench-auto-repair-garage.jpg';
import { HashLink as Link } from "react-router-hash-link";
import Footerhome from '../Footerhome/footerhome';
import Navbar from '../Navbar/Navbar';
import Aboutpage from '../Aboutpage/Aboutpage';
import Contact from '../Contact/Contact';

function LandingPage() {
    return (

        <>

        <Navbar/>


        <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="white-overlay">
                <div className="content">
                    <h1 className='para-land'>Mechanic will<br></br> come to your place<br></br><div className='dinu-land'> Very Fast </div> </h1>

                    <div className="land_btn" >
                        <Link to="/userLogin" className="landpage-button2"><button id="button-land" > Repair here</button></Link>
                    </div>
                </div>
            </div>

        </div>
        <Aboutpage/>
        <Contact/>
        <Footerhome/>
        

        </>
    );
}
export default LandingPage;


