import { getDatabase, onValue, ref } from 'firebase/database';
import React, { createContext, useState, useEffect } from 'react';
export const TokenContext = createContext();

function TokenContextProvider(props) {

    const [loggedInUser, setLoggedInUser] = useState(null); // Include loggedInUser state
    const [role, setRole] = useState(null);


    const logOut = () => {
        localStorage.removeItem('login-data');
        setLoggedInUser(null); // Update loggedInUser to null on logout
    }
    const loggedInData = () => {
        try {
            console.log("Nirali");
            const getData = JSON.parse(localStorage.getItem('login-data'));
            console.log("getData", getData.role);
            setRole(getData.role);
            setLoggedInUser(getData);
        } catch (error) {
            console.error('Error parsing token:', error);

            setLoggedInUser(null);
        }
    };

    useEffect(() => {
        loggedInData();
    }, [])

    return (
        <div>
            <TokenContext.Provider value={{ logOut, loggedInData, loggedInUser, role, setRole }}>
                {props.children}
            </TokenContext.Provider>
        </div >
    )
}
export default TokenContextProvider;


// import React, { createContext, useState, useEffect } from 'react';
// export const TokenContext = createContext();

// function TokenContextProvider(props) {
//     const [data, setData] = useState('')
//     const [loggedInUser, setLoggedInUser] = useState(null); // Include loggedInUser state
//     const logOut = () => {
//         localStorage.removeItem('login-data');
//         setLoggedInUser(null); // Update loggedInUser to null on logout
//     }
//     // const loggedInData = () => {
//     //     console.log("Nirali")
//     //     // console.log("Nirali", JSON.parse(localStorage.getItem('logintoken')))
//     //     const getData = JSON.parse(localStorage.getItem('login-data'))
//     //     console.log("hyy0", getData)
//     //     setData(getData);
//     //     setLoggedInUser(getData); // Update loggedInUser with the data from localStorage
//     // }
//     const loggedInData = () => {
//         try {
//             console.log("Nirali");
//             const getData = JSON.parse(localStorage.getItem('login-data'));

//             setData(getData);
//             setLoggedInUser(getData);
//         } catch (error) {
//             console.error('Error parsing token:', error);
//             // Handle the error here, e.g., set loggedInUser to null or redirect to the login page.
//             setLoggedInUser(null);
//         }
//     };

//     useEffect(() => {
//         loggedInData();
//     }, [])
//     useEffect(() => {
//     }, [data])
//     return (
//         <div>
//             <TokenContext.Provider value={{ logOut, loggedInData, data, loggedInUser }}>
//                 {props.children}
//             </TokenContext.Provider>
//         </div >
//     )
// }
// export default TokenContextProvider;