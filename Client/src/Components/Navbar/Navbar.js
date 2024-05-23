import React from "react";
import './Navbar.css'
import GGG from '../Navbar/image/GGG.png'
import { HashLink as Link } from "react-router-hash-link";


function Navbar () {
    return(

        <div>
    <nav className="navbar">
        <div className="logo-logo">
            <img src={GGG} alt="" className="logo-nav"/>
        </div>
        <div className='align'>
            <Link to="/" className="home-nav-home">Home</Link>
            <Link to="/About" className="nav-about">About Us</Link>
            <Link to="/Contact" className="nav-contact">Contact Us</Link>
        </div>
        <div className="btn--row">
            {/* <a href="/" className="btn-">Repair here</a> */}
                <Link to="/userLogin" className="btn-">
                <button className="btn-nav">Login</button>
            </Link>
        </div>
    </nav>
</div>





        // <div>
        //     <div className="logo-logo">
        //     <img src={GG} alt=""  className="logo-nav"/>
        //     </div>

        //     <nav className="navbar">
        //         <div className='align'>
        //             <Link to="/" className="home-nav-home">Home</Link>
        //             <Link to="/About" className="nav-about" >About Us</Link>
        //             <Link to="/Contact" className="nav-contact" >Contact Us</Link>


        //         </div>
        //         <div className="btn--row">
        //             {/* <a href="/" className="btn-">Repair here</a> */}
        //             <Link to ="/userLogin" className="btn-"><button className="btn-nav">Login</button></Link>
        //         </div>
        //     </nav>
        // </div>
    )
}

export default Navbar;




// import React from "react";
// import './Navbar.css'


// function Navbar () {
//     return(
//         <div>
//     <nav class="navbar">
//         <div className='alighn'>
//         <a href="/" >Home</a>
//          <a href="/Note">Note</a>
//         <a href="/About">About</a>
//         <a href="/Contact">Contact</a> 
//         </div>
//         <div className="btn-dow">
//         </div>

//     </nav>
//         </div>
//     )
// }
// export default Navbar

// import React from "react";
// import './Navbar.css';
// import Button from "../Button/Button";

// function Navbar() {
//     return (
//         <div>
//             <nav className="navbar">
//                 <div className='align'>
//                     <a href="/" >Home</a>
//                     <a href="/Note">Note</a>
//                     <a href="/About">About</a>
//                     <a href="/Contact">Contact</a> 
//                 </div>
//                 <div className="btn-group">
//                     <Button label="Button 1" />
//                     <Button label="Button 2" />
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default Navbar;

