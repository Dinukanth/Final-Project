import React from "react";
import '../Aboutpage/Aboutpage.css';
import img from '../Aboutpage/Images/img.jpg'; // Replace this with your local image path
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

















// import React from "react";
// import '../Aboutpage/Aboutpage.css';
// import img from './Images/img.jpg';
// import Navbar from "../Navbar/Navbar";

// function Aboutpage() {
//     return (
//         <div>
//             <Navbar />
//             <div className="about-container">
//                 <img src={img} alt="Mechanic tools" className="about-image" />
//                 <div className="about-content">
//                     <h1>About Mechanic Finder</h1>
//                     <p>
//                         Mechanic Finder is the solution to your automotive problems,
//                         connecting you with mechanics for on-the-spot services.
//                         Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
//                         Our platform is designed to make vehicle maintenance effortless.
//                         Join Mechanic Finder today for a new, stress-free way to keep your
//                         vehicle in top condition.
//                     </p>
//                 </div>
//             </div>
//             <div className="cards-container">
//                 <div className="card card-spot-work">
//                     <h2>On-the-Spot Work</h2>
//                     <p>Get immediate assistance from mechanics wherever you are.</p>
//                 </div>
//                 <div className="card card-nearby-mechanic">
//                     <h2>Find Nearby Mechanics</h2>
//                     <p>Quickly locate reliable mechanics close to your location.</p>
//                 </div>
//                 <div className="card card-affordable-services">
//                     <h2>Affordable Services</h2>
//                     <p>Receive high-quality services at reasonable prices.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Aboutpage;



//
//import React from "react";
// import '../Aboutpage/Aboutpage.css';
// import img from './Images/img.jpg';
// import nearbyMechanicImg from './Images/nearbyMechanic.jpg'; // Replace with your image path
// import spotWorkImg from './Images/spotWork.jpg'; // Replace with your image path
// import affordableServicesImg from './Images/affordableServices.jpg'; // Replace with your image path
// import Navbar from "../Navbar/Navbar";

// function Aboutpage() {
//     return (
//         <div>
//             <Navbar />
//             <div className="about-container">
//                 <img src={img} alt="Mechanic tools" className="about-image" />
//                 <div className="about-content">
//                     <h1>About Mechanic Finder</h1>
//                     <p>
//                         Mechanic Finder is the solution to your automotive problems,
//                         connecting you with mechanics for on-the-spot services.
//                         Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
//                         Our platform is designed to make vehicle maintenance effortless.
//                         Join Mechanic Finder today for a new, stress-free way to keep your
//                         vehicle in top condition.
//                     </p>
//                 </div>
//             </div>
//             <div className="cards-container">
//                 <div className="card">
//                     <img src={spotWorkImg} alt="On-the-Spot Work" className="card-image" />
//                     <h2>On-the-Spot Work</h2>
//                     <p>Get immediate assistance from mechanics wherever you are.</p>
//                 </div>
//                 <div className="card">
//                     <img src={nearbyMechanicImg} alt="Find Nearby Mechanics" className="card-image" />
//                     <h2>Find Nearby Mechanics</h2>
//                     <p>Quickly locate reliable mechanics close to your location.</p>
//                 </div>
//                 <div className="card">
//                     <img src={affordableServicesImg} alt="Affordable Services" className="card-image" />
//                     <h2>Affordable Services</h2>
//                     <p>Receive high-quality services at reasonable prices.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Aboutpage;
// //














// import React from "react";
// import '../Aboutpage/Aboutpage.css';
// import img from './Images/img.jpg';
// import Navbar from "../Navbar/Navbar";

// function Aboutpage() {
//     return (
//         <div>
//             <Navbar />
//             <div className="about-container">
//                 <img src={img} alt="Mechanic tools" className="about-image" />
//                 <div className="about-content">
//                     <h1>About Mechanic Finder</h1>
//                     <p>
//                         Mechanic Finder is the solution to your automotive problems,
//                         connecting you with mechanics for on-the-spot services.
//                         Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
//                         Our platform is designed to make vehicle maintenance effortless.
//                         Join Mechanic Finder today for a new, stress-free way to keep your
//                         vehicle in top condition.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Aboutpage;
















// import React from "react";
// import '../Aboutpage/Aboutpage.css';
// import img from './Images/img.jpg';
// import { FaWrench, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
// import Navbar from "../Navbar/Navbar";

// function Aboutpage() {
//     return (
//         <div>
//             <Navbar />
//             <div className="about-container">
//                 <img src={img} alt="Mechanic tools" className="about-image" />
//                 <div className="about-content">
//                     <h1>About Mechanic Finder</h1>
//                     <p>
//                         Mechanic Finder is the solution to your automotive problems,
//                         connecting you with mechanics for on-the-spot services.
//                         Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
//                         Our platform is designed to make vehicle maintenance effortless.
//                         Join Mechanic Finder today for a new, stress-free way to keep your
//                         vehicle in top condition.
//                     </p>
//                 </div>
//             </div>
//             <div className="cards-container">
//                 <div className="card">
//                     <FaWrench className="card-icon" />
//                     <h2>On-the-Spot Work</h2>
//                     <p>Get immediate assistance from mechanics wherever you are.</p>
//                 </div>
//                 <div className="card">
//                     <FaMapMarkerAlt className="card-icon" />
//                     <h2>Find Nearby Mechanics</h2>
//                     <p>Quickly locate reliable mechanics close to your location.</p>
//                 </div>
//                 <div className="card">
//                     <FaDollarSign className="card-icon" />
//                     <h2>Affordable Services</h2>
//                     <p>Receive high-quality services at reasonable prices.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Aboutpage;

























// import React from "react";
// import '../Aboutpage/Aboutpage.css'
// import img from './Images/img.jpg'
// import img09 from './Images/img09.jpg'
// import Navbar from "../Navbar/Navbar";
// // import img08 from './Images/img08'

// function Aboutpage() {
//     return (
//         <div>
//             <Navbar/>
//             <div className="background-about" id="about-home-about">
//                 <img src={img} alt="img.jpg" className="about-img-image"/>

//                 {/* <div className="background-about">
//                 <img src={img08} alt="img08.jpg" /> */}

//                 {/* <div className="back-back_img_9">
//                     <img src={img09} alt="img09.jpg" />

//                 </div> */}

//                 <div className="text-overlay">

//                     <h1>Mechanic Finder is the solution to your automotive problems,
//                         connecting you with mechanics for on-the-spot services.
//                         Say goodbye to long waits at the garage and enjoy convenient vehicle maintenance wherever you are.
//                         Our platform is designed to make vehicle maintenance effortless.
//                         Join Mechanic Finder today for a new, stress-free way to keep your
//                         vehicle in top condition.
//                     </h1>

//                 </div>
              
//             </div>
//         </div>
//     )
// }

// export default Aboutpage
