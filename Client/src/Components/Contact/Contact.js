// import React from "react";
// import '../Contact/Contact.css'

// function Contact() {

//     return(
//         <div>
            
//         </div>
//     )
    
// }

import React from 'react';
import '../Contact/Contact.css'
import Navbar from '../Navbar/Navbar';
import Footerhome from '../Footerhome/footerhome';
function Contact() {
    return (
        <>
        {/* <Navbar/> */}
        <div className='con-con-contact'>

        <section className="contact" id='contact-contact-home'>
            <div className="container">
                <div className="info_container">
                   
                    <InfoItem icon="fa-location-dot" title="Location" info="Vattappalai, Mulliyawali, Mullaithivu" />
                    <InfoItem icon="fa-envelope" title="Email" info="pdinukanth@gmail.com" />
                    <InfoItem icon="fa-phone" title="Call" info="+94760061396" />
                    <InfoItem icon="fa-clock" title="Open Hours" info="Mon-Sat: 8AM - 21PM" />
                </div>
                <div className="input_container">
                    <ContactForm />
                </div>
            </div>
            
        </section>
        </div>
        </>
        
        
    );
}

function InfoItem({ icon, title, info }) {
    return (
        <div className='con-con-contact'>

        <div className="info_item">
            <div className="icon">
                {/* <i className={`fa-solid fa-${icon}`}></i> */}
            </div>
            <div className="information">
                <h4>{title}:</h4>
                <p>{info}</p>
            </div>
        </div>
        </div>
    );
}

function ContactForm() {
    return (
        <>
        <div className='con-con-contact'>

        <form action="#">
            <div className="row">
                <input type="text" name="" id="" className="form_control" placeholder="Your Name" required />
                <input type="email" name="" id="" className="form_control" placeholder="Email Address" required />
            </div>
            <input type="text" name="" id="" placeholder="Subject" className="form_control" required />
            <textarea name="" id="" cols="30" rows="7" className="form_control" placeholder="Message" required></textarea>
            <div className="btn-con"><button type="submit">Send Message</button></div>



        </form>
        </div>

            {/* <Footerhome/> */}


        </>
    );
}

export default Contact;

