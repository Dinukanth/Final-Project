import React from 'react';
import './mechHome.css';
import Navmech from './Navmech';

const MechanicUserPage = () => {
  // Dummy data for demonstration purposes
  const mechanic = {
    Name: 'Vimal',
    Email: 'vimall@gmail.com',
    Phonenumber: '0745689754',
    Address: 'Bike',
    WhatkindofMechanic: 'Bike',
    GarageLocation: 'https://i.ibb.co/yNGW4gg/avatar.png',
    latitude: '7.2303143',
    longitude: '80.016474'
  };

  return (
    <>
      <Navmech />
      <div className="mechanic-container">
        <div className="profile-section">
          <img
            src={mechanic.GarageLocation}
            alt="Avatar"
            className="profile-avatar"
          />
          <h1>{mechanic.Name}</h1>
          <h3>Mechanic</h3>
        </div>
        <div className="details-section">
          <div className="details-card">
            <ul className="mechanic-details">
              <li><b>Full Name:</b> {mechanic.Name}</li>
              <li><b>Email:</b> {mechanic.Email}</li>
              <li><b>Contact Number:</b> {mechanic.Phonenumber}</li>
              <li><b>Address:</b> {mechanic.Address}</li>
              <li><b>Type of Mechanic:</b> {mechanic.WhatkindofMechanic}</li>
            </ul>
          </div>
          <div className="map-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.google.com/maps?q=${mechanic.latitude},${mechanic.longitude}&hl=es;z=14&output=embed`}
              title={mechanic.Name}
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default MechanicUserPage;


