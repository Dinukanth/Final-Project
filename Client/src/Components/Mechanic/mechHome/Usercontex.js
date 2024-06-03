// src/Components/Mechanic/mechHome/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulate fetching user info on login (you would replace this with real logic)
  useEffect(() => {
    const fetchUser = async () => {
      // Replace with actual API call to fetch logged-in user info
      const loggedInUser = await fakeAuthApi(); // This should be replaced with your actual authentication logic
      setUser(loggedInUser);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Simulated authentication function (replace with real authentication)
const fakeAuthApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: '123', name: 'John Doe', email: 'john.doe@example.com' });
    }, 1000);
  });
};
