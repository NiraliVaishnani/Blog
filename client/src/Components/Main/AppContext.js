import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <AppContext.Provider value={{ showDropdown, toggleDropdown }}>
            {children}
        </AppContext.Provider>
    );
};
