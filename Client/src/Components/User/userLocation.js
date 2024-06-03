import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLocation = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3004/form/getforms') 
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user forms:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All User Locations</h2>
      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <div>
          {users.length > 0 ? (
            <div>
              {users.map(user => (
                <div key={user._id}>
                  <h3>{user.Name}</h3>
                  <p>Vehicle: {user.YourVehicle}</p>
                  <p>Issue: {user.VehicleIssue}</p>
                  {user.Livelocation && user.Livelocation.latitude && user.Livelocation.longitude ? (
                    <iframe
                      width="600"
                      height="450"
                      src={`https://www.google.com/maps?q=${user.Livelocation.latitude},${user.Livelocation.longitude}&hl=es;z=14&output=embed`}
                      title={user.Name}
                      style={{ border: 0 }}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p>Location data not available</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No user forms found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserLocation;
