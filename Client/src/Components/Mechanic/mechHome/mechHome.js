import React, { useEffect, useState } from 'react';
import './mechHome.css';
import Navmech from './Navmech';

const MechanicUserPage = () => {
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMechanicDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://final-project-2vgx.onrender.com/mech/getmech", {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMechanic(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch mechanic details.");
        }
      } catch (error) {
        console.error("Error fetching mechanic details:", error);
        setError("Error fetching mechanic details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMechanicDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!mechanic) {
    return <div>No mechanic details found. Please log in again.</div>;
  }

  const {
    Name,
    Email,
    Phonenumber,
    Address,
    WhatkindofMechanic,
    GarageLocation,
    latitude,
    longitude
  } = mechanic;

  return (
    <>
      <Navmech />
      <div className="mechanic-container">
        <div className="profile-section">
          <img
            src={GarageLocation}
            alt="Avatar"
            className="profile-avatar"
          />
          <div className="profile-details">
            <h1>{Name}</h1>
            <h3>Mechanic</h3>
          </div>
        </div>
        <div className="details-section">
          <div className="details-card">
            <ul>
              <li><b>Full Name:</b> {Name}</li>
              <li><b>Email:</b> {Email}</li>
              <li><b>Contact Number:</b> {Phonenumber}</li>
              <li><b>Address:</b> {Address}</li>
              <li><b>Type of Mechanic:</b> {WhatkindofMechanic}</li>
            </ul>
          </div>
          <div className="map-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`}
              title={Name}
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

