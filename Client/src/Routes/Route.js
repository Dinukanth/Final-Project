import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import Loginmech from "../Components/Login/Signupmech";
import Landpage from "../Components/Landpage/Landpage";
import Loginhome from "../Components/Login/Signup";
import Signupmech from "../Components/Login/Signupmech";
import Userlogin from "../Components/Login/userLogin";
import Whoare from "../Components/Whoare/Whoare";
import Aboutpage from "../Components/Aboutpage/Aboutpage";
import Contact from "../Components/Contact/Contact";
import Who from "../Components/Whoare/Who";
import Userform from "../Components/User/Userform";
import Mechadmin from "../Components/Admin/mechadmin";
import { Admin } from "../Components/Admin/Admin";
import MechanicUserPage from "../Components/Mechanic/mechHome/mechHome";
import UserAdmin from "../Components/Admin/userAdmin";
import Dashboard from "../Components/Admin/Layot";
import MechanicDashboard from "../Components/Mechanic/mechHome/mechOrder";
import MechanicPage from "../Components/Mechanic/mechHome/mechOrder";
// import MechanicOrderMessage from "../Components/Mechanic/mechHome/mechOrder";

// import CreditCardForm from "../Components/Mechanic/mechHome/mechPayment";




export default function RouteTable() {

    return(
        <div className="routesTable">

            <Routes>
            <Route path="/" element={<Landpage/>}/>
                
                <Route path="/userLogin" element={<Userlogin/>}/>
                <Route path="/Signup" element={<Loginhome/>}/>
                <Route path="/About" element={<Aboutpage/>}/>
                <Route path="/Contact" element={<Contact/>}/>
                <Route path="/Whoareyou" element={<Whoare/>}/>
                <Route path="/mechLogin" element={<Signupmech/>}/>
                <Route path="/usersignup" element={<Loginhome/>}/>
                <Route path="/Who" element={<Who/>}/>
                <Route path="/userForm" element={<Userform/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/Mechpage" element={<MechanicUserPage/>}/>
                <Route path="mechAdmin" element={<Mechadmin/>}/>
                <Route path="userAdmin" element={<UserAdmin/>}/>

                <Route path="/order" element={<MechanicDashboard/>}/>
                <Route path="/mechanicPage" element={<MechanicPage />} />
                {/* <Route path="/Card" element={<CreditCardForm/>}/> */}
                {/* <Route path="/order" element={<MechanicOrderMessage/>}/> */}
 

               
            </Routes>

            
        </div>
    )
    
}