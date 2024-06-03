

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MechanicLocation = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3004/mech/get')
      .then(response => {
        setMechanics(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching mechanics:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All Mechanics Locations</h2>
      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <div>
          {mechanics.length > 0 ? (
            <div>
              {mechanics.map(mechanic => (
                <div key={mechanic._id}>
                  <h3>{mechanic.Name}</h3>
                  <p>{mechanic.Address}</p>
                  {mechanic.latitude && mechanic.longitude ? (
                    <iframe
                      width="600"
                      height="450"
                      src={`https://www.google.com/maps?q=${mechanic.latitude},${mechanic.longitude}&hl=es;z=14&output=embed`}
                      title={mechanic.Name}
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
            <p>No mechanics found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MechanicLocation;






















































































