// // import React from "react";
// // import '../Landpage/Landpage.css';
// // import img4 from './Images/img4.jpg';

// // function Landpage() {
// //     return (
// //         <div>
// //             <div className="image1">
// //                 <img src={img4} alt="img4.jpg" />
// //             </div>

// //         </div>
// //     );
// // }

// // export default Landpage;

// // import React from "react";
// // import "./Landpage.css";
// // import img4 from "./Images/img4.jpg";

// // function Landpage() {
// //     return (
// //         <div>
// //             <div className="image1">
// //                 <img src={img4} alt="img4.jpg" />
// //                 <button className="land-btn">Button 1</button>
// //                 <button className="land-btn1">Button 2</button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Landpage;

// import React from "react";
// import "./Landpage.css";
// // import img4 from "./Images/img4.jpg";
// import img0 from "./Images/img000.jpg"
// import { HashLink as Link } from "react-router-hash-link";
// import Navbar from "../Navbar/Navbar";
// import Footerhome from "../Footerhome/footerhome";


// function Landpage() {
//     return (
//         <>
//             <Navbar />
//             <div className="image-container" id="home-home-landing">
//                 <img src={img0} alt="img000.jpg" className="image-" />
//                 <div className="button-container">
//                     {/* <div className="land_btn">
//                     <Link to ="#con-log-mech" className="landpage-button1">Mechanics</Link>
//                 </div> */}

//                     <div className="text_img">
//                         <h1 className="text-home">Mechanic will come to your place <br /><div className="txt-txt_back">very fast</div></h1>
//                     </div>




//                     <div className="land_btn" >
//                         <Link to="/userForm" className="landpage-button2"><button id="button-land" > Repair here</button></Link>
//                     </div>


//                     {/* <div className="text_p_img">
//                     <p className="p_text-home">A good and reliable mechanic will find your <br/> palce and come fast
//  <br/>
//                     <div className="txt-txt_back">very fast</div>
//                     </p> */}
//                     {/* </div> */}



//                 </div>
//             </div>
            // {/* <Footerhome/> */}
//         </>
//     );
// }

// export default Landpage;
// import React from 'react';
// import backgroundImage from './hand-car-mechanic-with-wrench-auto-repair-garage.jpg';
// import { HashLink as Link } from "react-router-hash-link";
// import Footerhome from '../Footerhome/footerhome';
// import Navbar from '../Navbar/Navbar';
// import Aboutpage from '../Aboutpage/Aboutpage';
// import Contact from '../Contact/Contact';

// function LandingPage() {
//     return (

//         <>

//         <Navbar/>


//         <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
//             <div className="white-overlay">
//                 <div className="content">
//                     <h1 className='para-land'>Mechanic will<br></br> come to your place<br></br><span style={{ color: 'silver', fontSize: '80px' }}> Very Fast</span></h1>

//                     <div className="land_btn" >
//                         <Link to="/userLogin" className="landpage-button2"><button id="button-land" > Repair here</button></Link>
//                     </div>
//                 </div>
//             </div>

//         </div>
//         <Aboutpage/>
//         <Contact/>
//         <Footerhome/>
        

//         </>
//     );
// }
// export default LandingPage;









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


