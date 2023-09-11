import React, { useState, useContext, createContext } from "react";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


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
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(`Access token`, token);
                setToken(token);
                // The signed-in user info.
                const user = result.user;
                console.log({ name: result.user.displayName, email: result.user.email })
                setUser({ name: result.user.displayName, email: result.user.email });
                console.log(`User info`, user);
                const uid = result.user.uid;
                console.log("uid", uid)
                setuid(uid)
                navigate(`/chat/${result.user.uid}`)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
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
        console.log("asdfghjkllssdfh")
        console.log("uniqueId", uniqueId)
    }
    return (
        <ChatContext.Provider value={{ user, setUser, googleLogin, token, selectedUserId, setSelectedUserId, uid, uniqueId, setuniqueId }}>
            {children}
        </ChatContext.Provider>
    );
}