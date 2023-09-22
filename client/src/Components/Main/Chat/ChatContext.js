import React, { useState, useContext, createContext } from "react";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, push, set, onChildAdded, child } from "firebase/database";


// Create a new context
export const ChatContext = createContext();

export const ChatProvider = ({ children, navigate }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [uid, setuid] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [uniqueId, setuniqueId] = useState(null);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(`Access token`, token);
                setToken(token);
                const user = result.user;
                // Create a user node and set user-specific data
                const db = getDatabase();
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
                navigate(`/chat/${result.user.uid}`)

            }).catch((error) => {
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
        <ChatContext.Provider value={{ user, setUser, googleLogin, token, selectedUserId, setSelectedUserId, uid, uniqueId, setuniqueId }}>
            {children}
        </ChatContext.Provider>
    );
}