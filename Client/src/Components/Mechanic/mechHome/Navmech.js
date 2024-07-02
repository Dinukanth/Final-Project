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


   
  )
}
