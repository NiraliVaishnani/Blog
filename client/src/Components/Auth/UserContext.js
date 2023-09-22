import React, { createContext, useState, useEffect } from 'react';
export const UserContext = createContext();

function UserContextProvider(props) {
    return (
        <div>
            <UserContext.Provider value={{ logOut, loggedInData, loggedInUser }}>
                {props.children}
            </UserContext.Provider>
        </div >
    )
}
export default UserContextProvider;