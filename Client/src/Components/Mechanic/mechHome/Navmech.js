import React from 'react'
import { HashLink as Link } from "react-router-hash-link";
import '../mechHome/Navmech.css'


export default function Navmech() {
  return (

    <div>

<nav className="navbar-mech">
                <div className='align-mech'>
                    <Link to="/Mechpage" className="home-nav-home-mech">Home</Link>
                    <Link to="/order" className="nav-about-mech" >Orderdetails</Link>
                    <Link to="/Card" className="nav-contact-mech" >Payment</Link>


                </div>
                </nav>


    </div>

//     <div>

//     <div className="logo-logo-mech">
//     {/* <img src={GG} alt=""  className="logo-nav"/> */}
//     </div>

//     <nav className="navbar-mech">
//         <div className='align-mech'>
//             <Link to="/" className="home-nav-mech">Home</Link>
//             <Link to="/About" className="nav-about-mech" >Order</Link>
//             <Link to="/Contact" className="nav-contact-mech" >Contact Us</Link>


//         </div>
        
//     </nav>
// </div>
   
  )
}
