

































// import React, { useState, useEffect } from 'react';
// import './mechHome.css';
// import Navmech from './Navmech';
// import axios from 'axios';

// const MechanicUserPage = () => {
//   const [mechanic, setMechanic] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMechanic = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found, please log in.');
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:3004/mech/get', {
//           headers: {
//             'x-auth-token': token
//           }
//         });
//         setMechanic(response.data);
//       } catch (error) {
//         console.error('Error fetching mechanic:', error);
//         setError('An error occurred while fetching mechanic details. Please try again later.');
//       }
//     };

//     fetchMechanic();
//   }, []);

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   if (!mechanic) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navmech />
//       <div className="mechanic-container">
//         <table>
//           <tbody>
//             <tr>
//               <td>
//                 <section>
//                   <i className="fa fa-camera"></i>
//                   <img
//                     src={mechanic.GarageLocation ? mechanic.GarageLocation : 'https://i.ibb.co/yNGW4gg/avatar.png'}
//                     alt="Avatar"
//                   />
//                 </section>
//                 <h1>{mechanic.Name}</h1>
//                 <h3>Mechanic</h3>
//               </td>
//               <td>
//                 <ul>
//                   <li><b>Full name:</b> {mechanic.Name}</li>
//                   <li><b>Email:</b> {mechanic.Email}</li>
//                   <li><b>Contact number:</b> {mechanic.Phonenumber}</li>
//                   <li><b>Address:</b> {mechanic.Address}</li>
//                   <li><b>Type of Mechanic:</b> {mechanic.WhatkindofMechanic}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default MechanicUserPage;
