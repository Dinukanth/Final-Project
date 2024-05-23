

// src/components/Admin.js
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
};

export default Dashboard;






















// // src/components/Layout.js
// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import { BiHome, BiTask, BiUser, BiSolidCarMechanic } from 'react-icons/bi';
// import './Admin.css';

// const Layout = () => {
//   return (
//     <div className="admin-layout">
//       <div className='menu-admin'>
//         <div className='logo-admin'>
//           <BiSolidCarMechanic className='logo-admin-icon'/>
//           <h2>Gear Grease</h2>
//         </div>

//         <div className='menu--list'>
//           <Link to='/admin' className='item-admin'>
//             <BiHome className='admin-icon'/>
//             Dashboard
//           </Link>
//           <Link to='/admin/mechadmin' className='item-admin'>
//             <BiTask className='admin-icon'/>
//             Mechanic
//           </Link>
//           <Link to='/admin/useradmin' className='item-admin'>
//             <BiUser className='admin-icon'/>
//             User
//           </Link>
//         </div>
//       </div>

//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;
