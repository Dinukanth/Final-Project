// src/contexts/RequestStatusContext.js
import React, { createContext, useState } from 'react';

export const RequestStatusContext = createContext();

export const RequestStatusProvider = ({ children }) => {
    const [requestStatus, setRequestStatus] = useState("");

    return (
        <RequestStatusContext.Provider value={{ requestStatus, setRequestStatus }}>
            {children}
        </RequestStatusContext.Provider>
    );
};
