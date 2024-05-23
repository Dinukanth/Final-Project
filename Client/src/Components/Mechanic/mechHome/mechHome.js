// import React from 'react'
// import '../mechHome/mechHome.css'
// import { HashLink as Link } from "react-router-hash-link";


// export default function mechHome() {
//   return (


//     <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
//     <div className="white-overlay">
//         <div className="content">
//             <h1>Mechanic will<br></br> come to your place<br></br><span style={{ color: 'silver', fontSize: '80px' }}> Very Fast</span></h1>

//             <div className="land_btn" >
//                 <Link to="/userForm" className="landpage-button2"><button id="button-land" > Repair here</button></Link>
//             </div>
//         </div>
//     </div>

// </div>






//   )
// }



// import React, { useEffect, useState } from 'react';
// import './mechHome.css';
// import Navmech from './Navmech';

// const MechanicUserPage = () => {
//   const [mechanicData, setMechanicData] = useState(null);

//   useEffect(() => {
//     const fetchMechanicData = async () => {
//       const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

//       if (!token) return;

//       try {
//         const response = await fetch('http://localhost:3004/api/mechanic', {
//           headers: {
//             'Authorization': token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch mechanic data');
//         }

//         const data = await response.json();
//         setMechanicData(data);
//       } catch (error) {
//         console.error('Error fetching mechanic data:', error);
//       }
//     };

//     fetchMechanicData();
//   }, []);

//   if (!mechanicData) {
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
//                   <label htmlFor="fileToUpload">
//                     <i className="fa fa-camera"></i>
//                     <input type="file" id="fileToUpload" style={{ visibility: 'hidden' }} accept=".png,.jpg,jpeg" name="fileToUpload" />
//                   </label>
//                   <img src={mechanicData.GarageLocation ? mechanicData.GarageLocation : 'https://i.ibb.co/yNGW4gg/avatar.png'} alt="Avatar" />
//                 </section>
//                 <h1>{mechanicData.Name}</h1>
//                 <h3>Mechanic</h3>
//               </td>
//               <td>
//                 <ul>
//                   <li><b>Full name</b> {mechanicData.Name}</li>
//                   <li><b>Email</b> {mechanicData.Email}</li>
//                   <li><b>Contact number</b> {mechanicData.Phonenumber}</li>
//                   <li><b>Address</b> {mechanicData.Address}</li>
//                   <li><b>Type of Mechanic</b> {mechanicData.WhatkindofMechanic}</li>
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





// import React, { useState, useEffect } from 'react';
// import './mechHome.css';
// import Navmech from './Navmech';
// import axios from 'axios';

// const MechanicUserPage = () => {
//   const [mechanic, setMechanic] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMechanic = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/mechanic/get', {
//           headers: {
//             'x-auth-token': token,
//           },
//         });
//         setMechanic(response.data);
//       } catch (error) {
//         console.error('Error fetching mechanic:', error);
//         setError('Failed to fetch mechanic details');
//       }
//     };

//     fetchMechanic();
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!mechanic) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Navmech />
//       <div className="mechanic-user-page">
//         <h2>Mechanic Details</h2>
//         <p><strong>Name:</strong> {mechanic.Name}</p>
//         <p><strong>Email:</strong> {mechanic.Email}</p>
//         <p><strong>Type of Mechanic:</strong> {mechanic.WhatkindofMechanic}</p>
//         <p><strong>Phone Number:</strong> {mechanic.Phonenumber}</p>
//         <p><strong>Address:</strong> {mechanic.Address}</p>
//         {/* Add more details as needed */}
//       </div>
//     </div>
//   );
// };

// export default MechanicUserPage;








import React, { useState, useEffect } from 'react';
import './mechHome.css';
import Navmech from './Navmech';
import axios from 'axios';

const MechanicUserPage = () => {
  const [mechanic, setMechanic] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMechanic = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3004/mech/get', {
          headers: {
            'x-auth-token': token
          }
        });
        setMechanic(response.data);
      } catch (error) {
        console.error('Error fetching mechanic:', error);
        setError('An error occurred while fetching mechanic details. Please try again later.');
      }
    };

    fetchMechanic();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!mechanic) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navmech />
      <div className="mechanic-container">
        <table>
          <tbody>
            <tr>
              <td>
                <section>
                  <i className="fa fa-camera"></i>
                  <img
                    src={mechanic.GarageLocation ? mechanic.GarageLocation : 'https://i.ibb.co/yNGW4gg/avatar.png'}
                    alt="Avatar"
                  />
                </section>
                <h1>{mechanic.Name}</h1>
                <h3>Mechanic</h3>
              </td>
              <td>
                <ul>
                  <li><b>Full name:</b> {mechanic.Name}</li>
                  <li><b>Email:</b> {mechanic.Email}</li>
                  <li><b>Contact number:</b> {mechanic.Phonenumber}</li>
                  <li><b>Address:</b> {mechanic.Address}</li>
                  <li><b>Type of Mechanic:</b> {mechanic.WhatkindofMechanic}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MechanicUserPage;













// import React, { useState, useEffect } from 'react';
// import './mechHome.css';
// import Navmech from './Navmech';
// import axios from 'axios';

// const MechanicUserPage = () => {
//   const [mechanics, setMechanics] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3004/mech/get')
//       .then(response => setMechanics(response.data))
//       .catch(error => {
//         console.error('Error fetching users:', error);
//         setError('An error occurred while fetching users. Please try again later.');
//       });
//   }, []);

//   return (
//     <>
//       <Navmech />
//       <div className="mechanic-container">
//         {error && <div className="error-message">{error}</div>}
//         <table>
//           <tbody>
//             {mechanics.map(mechanic => (
//               <tr key={mechanic._id}>
//                 <td>
//                   <section>
//                     <i className="fa fa-camera"></i>
//                     <img
//                       src={mechanic.GarageLocation ? mechanic.GarageLocation : 'https://i.ibb.co/yNGW4gg/avatar.png'}
//                       alt="Avatar"
//                     />
//                   </section>
//                   <h1>{mechanic.Name}</h1>
//                   <h3>Mechanic</h3>
//                 </td>
//                 <td>
//                   <ul>
//                     <li><b>Full name:</b> {mechanic.Name}</li>
//                     <li><b>Email:</b> {mechanic.Email}</li>
//                     <li><b>Contact number:</b> {mechanic.Phonenumber}</li>
//                     <li><b>Address:</b> {mechanic.Address}</li>
//                     <li><b>Type of Mechanic:</b> {mechanic.WhatkindofMechanic}</li>
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default MechanicUserPage;








// import React, { useState, useEffect } from 'react';
// import './mechHome.css';
// import Navmech from './Navmech';
// import axios from 'axios';


// const MechanicUserPage = () => {


//   const [mechanics, setMechanics] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:3004/mech/get')
//             .then(response => setMechanics(response.data))
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//                 setError('An error occurred while fetching users. Please try again later.');
//             });
//     }, []);






//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     serviceCategory: '',
//     productImage: null,
//     productTitle: '',
//     tags: '',
//     description: ''
//   });



//   return (

//     <>
//     <Navmech/>

    


//     <div className="mechanic-container">
     
//       <table>
//         <tbody>
//           <tr>
//             <td>
//               <section>
//                   <i className="fa fa-camera"></i>
                  
//                 <img src={formData.productImage ? URL.createObjectURL(formData.productImage) : 'https://i.ibb.co/yNGW4gg/avatar.png'} alt="Avatar" />
//               </section>
//               <h1>{formData.fullName}</h1>
//               <h3>Mechanic</h3>
//             </td>
//             <td>
//               <ul>
//                 <li><b>Full name</b> <input type="text" name="fullName"  required /></li>
//                 <li><b>Email</b> <input type="email" name="email"  required /></li>
//                 <li><b>Contact number</b> <input type="tel" name="phone"  required /></li>
//                 <li><b>Address</b> <input type="text" name="address"  required /></li>
//                 {/* <label htmlFor="productImage">Upload Your Profile Picture</label>
//                   <input type="file" name="productImage" id="productImage" accept=".jpg,.png,.jpeg" onChange={handleFileChange} required /> */}
//               </ul>
//             </td>
//           </tr>

//         </tbody>
//       </table>
//     </div>

//     </>
//   );
// };

// export default MechanicUserPage;








// import React, { useState } from 'react';
// import './mechHome.css';
// import Navmech from './Navmech';

// const MechanicUserPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '0123456789',
//     address: '123 Main St, Anytown, USA',
//     serviceCategory: '',
//     productImage: null,
//     productTitle: '',
//     tags: '',
//     description: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit form data logic
//   };

//   return (

//     <>
//     <Navmech/>

    


//     <div className="mechanic-container">
//       {/* <div className="alert">
//         <span className="closebtn" onClick={() => document.querySelector('.alert').style.display = 'none'}>&times;</span>
//         <strong>NOTE!</strong> Please verify your account. <a href="#" style={{ color: '#7ed321' }}>Resend Verification Code</a>
//       </div> */}
//       <table>
//         <tbody>
//           <tr>
//             <td>
//               <section>
//                 <label htmlFor="fileToUpload">
//                   <i className="fa fa-camera"></i>
//                   <input type="file" id="fileToUpload" style={{ visibility: 'hidden' }} accept=".png,.jpg,jpeg" name="fileToUpload" onChange={handleFileChange} />
//                 </label>
//                 <img src={formData.productImage ? URL.createObjectURL(formData.productImage) : 'https://i.ibb.co/yNGW4gg/avatar.png'} alt="Avatar" />
//               </section>
//               <h1>{formData.fullName}</h1>
//               <h3>Mechanic</h3>
//             </td>
//             <td>
//               <ul>
//                 <li><b>Full name</b> <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></li>
//                 <li><b>Email</b> <input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></li>
//                 <li><b>Contact number</b> <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required /></li>
//                 <li><b>Address</b> <input type="text" name="address" value={formData.address} onChange={handleInputChange} required /></li>
//               </ul>
//             </td>
//           </tr>

          
//           <tr>

//             <td className="section2">
//               {/* <h2>PUBLISH YOUR PRODUCT</h2> */}
//               <ul>
//                 {/* <li>
//                   <select name="serviceCategory" value={formData.serviceCategory} onChange={handleInputChange}>
//                     <option value="0">Choose a category</option>
//                     <option value="repair">Car mechanic</option>
//                     <option value="maintenance">Bike mechanic</option>
//                     <option value="customization">Three wheeler</option>
//                   </select>
//                 </li> */}
//                 <li>
//                   <label htmlFor="productImage">Upload Your Profile Picture</label>
//                   <input type="file" name="productImage" id="productImage" accept=".jpg,.png,.jpeg" onChange={handleFileChange} required />
//                 </li>
//                 {/* <li>
//                   <label htmlFor="productTitle">Product Title</label>
//                   <input type="text" id="productTitle" name="productTitle" placeholder="e.g., Engine Repair" value={formData.productTitle} onChange={handleInputChange} required />
//                 </li> */}
//                 {/* <li>
//                   <label htmlFor="tags">Tags</label>
//                   <input type="text" id="tags" name="tags" placeholder="e.g., repair, maintenance" value={formData.tags} onChange={handleInputChange} required />
//                 </li> */}
//                 {/* <li>
//                   <label htmlFor="description">Description</label>
//                   <textarea id="description" name="description" placeholder="Describe your service" value={formData.description} onChange={handleInputChange} required ></textarea>
//                 </li> */}
//               </ul>
//               {/* <button className="btn-u-mech" onClick={handleSubmit}>SUBMIT</button> */}
//             </td>
//             {/* <td className="inframe">
//               <h2>SERVICES IN FRAME</h2>
//               <div className="card">
//                 <img src="https://i.ibb.co/pwHsGgc/01.jpg" alt="NO PREVIEW" />
//                 <section className="card_content">
//                   <h3>Engine Repair</h3>
//                   <ul>
//                     <li><b>Published Date: </b>12/05/2023</li>
//                     <li><b>Quantity: </b><input type="tel" name="updateQuantity" id="updateQuantity" value="10" onChange={handleInputChange} required /></li>
//                     <li><b>Price: </b><input type="tel" name="updatePrice" id="updatePrice" value="200" onChange={handleInputChange} required /></li>
//                   </ul>
//                   <button className="btn">UPDATE</button> <button className="btn" style={{ background: '#960c06' }}>DELETE</button>
//                 </section>
//               </div>
//             </td> */}
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     </>
//   );
// };

// export default MechanicUserPage;

































































// import React, { useState } from 'react';
// import '../mechHome/mechHome.css'

// import './custom.js';
// import 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
// import 'https://fonts.googleapis.com/css2?family=Odibee+Sans&family=Oswald:wght@300;400&family=Ubuntu:wght@700&display=swap';
// import 'https://fonts.googleapis.com/css2?family=Pattaya&display=swap';

// const mechHome = () => {
//   const [image, setImage] = useState('https://i.ibb.co/yNGW4gg/avatar.png');
//   const [fname, setFname] = useState('John Conner');
//   const [mobile, setMobile] = useState('0123456789');
//   const [address, setAddress] = useState('Street, Pincode, Province/State, Country');
//   const [updateQuantity, setUpdateQuantity] = useState('1500');
//   const [updatePrice, setUpdatePrice] = useState('40');

//   const handleImageChange = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleInputChange = (e, setter) => {
//     setter(e.target.value);
//   };

//   const handleEditClick = (id, checkId, pointerEvents) => {
//     document.getElementById(id).style.pointerEvents = pointerEvents;
//     document.getElementById(id).focus();
//     document.getElementById(checkId).style.display = 'inline-block';
//   };

//   const handleCheckClick = (editId, checkId) => {
//     document.getElementById(editId).style.display = 'inline-block';
//     document.getElementById(checkId).style.display = 'none';
//   };

//   return (
//     <div className="container">
//       <div className="alert">
//         <span className="closebtn">&times;</span>
//         <strong>NOTE!</strong> Please verify your account. <a href="#" style={{ color: '#7ed321' }}>Resend Verification Code</a>
//       </div>
//       <table>
//         <tbody>
//           <tr>
//             <td>
//               <section>
//                 <label htmlFor="fileToUpload">
//                   <i className="fa fa-camera"></i>
//                   <input type="file" id="fileToUpload" style={{ visibility: 'hidden' }} accept=".png,.jpg,jpeg,.PNG,.JPEG" name="fileToUpload" onChange={handleImageChange} />
//                 </label>
//                 <img src={image} id="blah" alt="Avatar" />
//               </section>
//               <h1>J Conner</h1>
//               <h3>Web Designer & Developer</h3>
//             </td>
//             <td>
//               <ul>
//                 <li><b>Full name</b> <input type="text" name="fname" id="fname" maxLength="100" value={fname} onChange={(e) => handleInputChange(e, setFname)} required /> <i className="fa fa-edit" id="edit1" onClick={() => handleEditClick('fname', 'check1', 'auto')}></i> <i className="fa fa-check" style={{ display: 'none' }} id="check1" onClick={() => handleCheckClick('edit1', 'check1')}></i></li>
//                 <li><b>Email</b> <input type="email" name="email" id="email" maxLength="150" value="email@mail.com" required /></li>
//                 <li><b>Contact number</b> <input type="tel" name="mobile" id="mobile" maxLength="10" value={mobile} onChange={(e) => handleInputChange(e, setMobile)} required /> <i className="fa fa-edit" id="edit2" onClick={() => handleEditClick('mobile', 'check2', 'auto')}></i> <i className="fa fa-check" style={{ display: 'none' }} id="check2" onClick={() => handleCheckClick('edit2', 'check2')}></i></li>
//                 <li><b>Address</b> <input type="text" name="address" id="address" maxLength="250" value={address} onChange={(e) => handleInputChange(e, setAddress)} required /> <i className="fa fa-edit" id="edit3" onClick={() => handleEditClick('address', 'check3', 'auto')}></i> <i className="fa fa-check" style={{ display: 'none' }} id="check3" onClick={() => handleCheckClick('edit3', 'check3')}></i></li>
//               </ul>
//             </td>
//           </tr>
//           <tr>
//             <td className="section2">
//               <h2 style={{ textAlign: 'left' }}>PUBLISH YOUR PRODUCT</h2>
//               <ul>
//                 <li>
//                   <select>
//                     <option value="0">Choose a category</option>
//                     <option value="fruits">Fruits</option>
//                     <option value="groceries">Groceries</option>
//                     <option value="vegetables">Vegetables</option>
//                   </select>
//                 </li>
//                 <li>
//                   <label htmlFor="productimage">Upload Your Product Picture</label>
//                   <input type="file" name="productimage" id="productimage" accept=".jpg,.JPG,.png,.PNG,.jpeg,.JPEG" required />
//                 </li>
//                 <li>
//                   <label htmlFor="title">Product Title</label>
//                   <input type="text" id="title" name="title" placeholder="eg:Farm Tomoto" maxLength="30" required />
//                 </li>
//                 <li>
//                   <label htmlFor="tags">Tags</label>
//                   <input type="text" id="tags" name="tags" placeholder="eg:tomoto,brinjal,onions" maxLength="50" required />
//                 </li>
//                 <li>
//                   <label htmlFor="description">Description</label>
//                   <textarea id="description" name="description" placeholder="Tell something about your product" maxLength="250" required></textarea>
//                 </li>
//               </ul>
//               <button className="btn" style={{ width: '100px' }}>SUBMIT</button>
//             </td>
//             <td className="inframe">
//               <h2>PRODUCTS IN FRAME</h2>
//               <div className="card">
//                 <img src="https://i.ibb.co/pwHsGgc/01.jpg" alt="NO PREVIEW" />
//                 <section className="card_content">
//                   <h3>Tomoto</h3>
//                   <ul>
//                     <li><b>Published Date: </b>12/05/2021</li>
//                     <li><b>Quantity: </b><input type="tel" name="updatequantity" id="updatequantity" value={updateQuantity} onChange={(e) => handleInputChange(e, setUpdateQuantity)} required /> <i className="fa fa-edit" id="uedit1" onClick={() => handleEditClick('updatequantity', 'ucheck1', 'auto')}></i> <i className="fa fa-check" style={{ display: 'none' }} id="ucheck1" onClick={() => handleCheckClick('uedit1', 'ucheck1')}></i></li>
//                     <li><b>Quantity In Supply: </b>300KG</li>
//                     <li><b>Price: </b><input type="tel" name="updateprice" id="updateprice" value={updatePrice} onChange={(e) => handleInputChange(e, setUpdatePrice)} required /> <i className="fa fa-edit" id="uedit2" onClick={() => handleEditClick('updateprice', 'ucheck2', 'auto')}></i> <i className="fa fa-check" style={{ display: 'none' }} id="ucheck2" onClick={() => handleCheckClick('uedit2', 'ucheck2')}></i></li>
//                   </ul>
//                   <button className="btn">UPDATE</button> <button className="btn" style={{ background: '#960c06' }}>DELETE</button>
//                 </section>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default mechHome;


