import React from 'react'
import { BiHome, BiMessage, BiStats, BiTask, BiHelpCircle, BiSolidCarMechanic, BiUser, BiSolidCarGarage, BiSolidReceipt} from 'react-icons/bi'
import '../Admin/Admin.css'
// BiSolidReport,
import Navbar from '../Navbar/Navbar'
import { HashLink as Link } from "react-router-hash-link";
import Overview from './Overview';


export const Admin = () => {
  return (

    <>
    {/* <Navbar/> */}


    <div className='menu-admin'>
        <div className='logo-admin'>
            <BiSolidCarMechanic className='logo-admin-icon'/>
            <h2>Gear Grease</h2>
        </div>

        
        <div className='menu--list'>
            <Link to='/overview' className='item-admin'>
            <BiHome className='admin-icon'/>
                Dashboard   
            </Link>
            <Link to='/mechAdmin' className='item-admin'>
                <BiSolidCarGarage className='admin-icon'/>
                Mechanic
            </Link>
            <Link to='/userAdmin' className='item-admin'>
                <BiUser className='admin-icon'/>
                User
            </Link>

             <a href='/orderadmin' className='item-admin'>
                <BiStats className='admin-icon'/>
                Order
            </a>
            {/*
            <a href='#' className='item-admin'>
                <BiMessage className='admin-icon'/>
                Message
            </a>
            <a href='#' className='item-admin'>
                <BiHelpCircle className='admin-icon'/>
                Help
            </a> */}
        </div>
    </div>
    {/* <Overview/> */}

    </>
  )
}
