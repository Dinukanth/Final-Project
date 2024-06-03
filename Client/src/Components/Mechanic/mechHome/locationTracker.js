import React, { useState, useEffect } from 'react';
function LocationTracker() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        
        },
        (error) => setError(error.message)
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);
  return (
    <div>
      <h2>User Location fetching</h2>
      {error && <p>Error: {error}</p>}
      {!error && location.lat && (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      )}
    </div>
  );
}
export default LocationTracker;