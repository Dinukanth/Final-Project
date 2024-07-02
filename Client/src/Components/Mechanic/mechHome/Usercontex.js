// src/Components/Mechanic/mechHome/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await fakeAuthApi(); 
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

const fakeAuthApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: '123', name: 'John Doe', email: 'john.doe@example.com' });
    }, 1000);
  });
};
