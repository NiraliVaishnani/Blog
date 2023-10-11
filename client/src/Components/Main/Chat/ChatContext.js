// import React, { useState, useContext, createContext, useEffect } from "react";
// //import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, push, set, onChildAdded, child } from "firebase/database";


// // Create a new context
// export const ChatContext = createContext();

// export const ChatProvider = ({ children, navigate }) => {
//     const [user, setUser] = useState("");
//     const [token, setToken] = useState("");
//     const [uid, setuid] = useState("");
//     const [selectedUserId, setSelectedUserId] = useState(null);
//     const [uniqueId, setuniqueId] = useState(null);
//     const provider = new GoogleAuthProvider();
//     const auth = getAuth();
//     const db = getDatabase();



//     const googleLogin = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const credential = GoogleAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;
//                 console.log(`Access token`, token);
//                 setToken(token);
//                 const user = result.user;
//                 // Create a user node and set user-specific data

//                 const userRef = ref(db, `chat/${result.user.uid}`);
//                 // Set user-specific data like name and profile picture URL
//                 set(userRef, {
//                     name: result.user.displayName,
//                     // Other user-specific data...
//                 });
//                 // // Create a reference to the "contacts" node under the user's path
//                 // const contactsRef = child(userRef, "contacts");

//                 // // Now you can set data under the "contacts" node as needed
//                 // set(contactsRef, {
//                 //     // Add your contact data here...
//                 // });
//                 console.log({ name: result.user.displayName, email: result.user.email })

//                 setUser({ name: result.user.displayName, email: result.user.email });
//                 console.log(`User info`, user);
//                 const uid = result.user.uid;
//                 console.log("uid", uid)
//                 setuid(uid)
//                 setuniqueId(uid);
//                 navigate(`/chat/${result.user.uid}`)

//             }).catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // The email of the user's account used.
//                 const email = error.customData.email;
//                 // The AuthCredential type that was used.
//                 const credential = GoogleAuthProvider.credentialFromError(error);
//                 // ...
//             });
//     }
//     return (
//         <ChatContext.Provider value={{ user, setUser, googleLogin, token, selectedUserId, setSelectedUserId, uid, uniqueId, setuniqueId }}>
//             {children}
//         </ChatContext.Provider>
//     );
// }




import React, { useState, useContext, createContext, useEffect } from "react";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, set, onChildAdded, child, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";


// Create a new context
export const ChatContext = createContext();

export const ChatProvider = ({ children, navigate }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [uid, setuid] = useState("");
    const [loginuid, setLoginUid] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [uniqueId, setuniqueId] = useState(null);
    const [name, setName] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [receiverId3, setReceiverId3] = useState(null);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getDatabase();

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    //         if (firebaseUser) {
    //             console.log("firebaseUser", firebaseUser)
    //             const token = firebaseUser.accessToken;
    //             console.log("token", token)
    //             const uid = firebaseUser.uid;
    //             setToken(token);
    //             console.log("uid@@@@@@@@@@@@@", uid);
    //             setuid(uid)
    //             setuniqueId(uid);
    //         }
    //     })

    // })

    useEffect(() => {
        googleLogin()
    }, [])
    useEffect(() => {
        const storedLoginDetails = localStorage.getItem("chatlogin");
        const parsedLoginDetails = JSON.parse(storedLoginDetails);

        // Now, parsedLoginDetails is an object you can work with
        console.log("parsedLoginDetails.uid", parsedLoginDetails?.uid);
        const loginuid = parsedLoginDetails?.uid;
        setLoginUid(loginuid);
        setuid(loginuid)
        const userRef = ref(db, `users/${loginuid}`);
        console.log("userRef", `users/${loginuid}`)
        const contactPath = `users/${loginuid}/contacts`;
        console.log("contactPath", contactPath)
        const contactRef = ref(db, contactPath);
        // onValue(userRef, (snapshot) => {
        //     const userData = snapshot.val();
        //     console.log(" userData", userData);
        //     console.log(" userDataName", userData?.name)
        //     setName(userData?.name);

        // });
        onValue(userRef, (snapshot) => {
            try {
                const userData = snapshot.val();
                console.log("userData", userData);
                console.log("userDataName", userData?.name);
                setName(userData?.name);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        });

        // Repeat error handling for other `onValue` callbacks

        onValue(contactRef, (snapshot) => {
            const contactData = snapshot.val();
            console.log("contactData", contactData);
            const receiverId = contactData?.['RecieverId'];
            // const receiverId = contactData?.['ReceiverId'];
            console.log("receiverId", receiverId)
            setReceiverId3(receiverId);
        });
        const dataRef = ref(db, `users/${loginuid}/contacts`);
        console.log("dataRef", `users / ${loginuid} / contacts`)
        // Attach an event listener to retrieve data
        onValue(dataRef, (snapshot) => {
            const dataArr = [];
            snapshot.forEach((childSnapshot) => {
                const uniqueID = childSnapshot.key;
                const childData = childSnapshot.val();
                const newData = {
                    id: uniqueID,
                    ...childData,
                };
                dataArr.push(newData);
            });
            console.log("dataArr", dataArr)
            setContacts(dataArr);
        });
    }, [])


    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(`Access token`, token);
                setToken(token);
                const user = result.user;
                // Create a user node and set user-specific data

                const userRef = ref(db, `chat/${result.user.uid}`);
                // Set user-specific data like name and profile picture URL
                set(userRef, {
                    name: result.user.displayName,
                    // Other user-specific data...
                });
                // // Create a reference to the "contacts" node under the user's path
                // const contactsRef = child(userRef, "contacts");

                // // Now you can set data under the "contacts" node as needed
                // set(contactsRef, {
                //     // Add your contact data here...
                // });
                console.log({ name: result.user.displayName, email: result.user.email })

                setUser({ name: result.user.displayName, email: result.user.email });
                console.log(`User info`, user);
                const uid = result.user.uid;
                console.log("uid", uid)
                setuid(uid)
                setuniqueId(uid);
                const logindetails = { token: token, name: result.user.displayName, email: result.user.email, uid: uid }
                localStorage.setItem("chatlogin", JSON.stringify(logindetails));
                navigate(`/chat/${result.user.uid}`)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <ChatContext.Provider value={{ user, setUser, googleLogin, token, selectedUserId, setSelectedUserId, uid, uniqueId, setuniqueId, name, setName, receiverId3, setReceiverId3, contacts, setContacts }}>
            {children}
        </ChatContext.Provider>
    );
}