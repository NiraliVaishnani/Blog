import React, { useContext } from 'react'
import { ChatContext } from './ChatContext';
import { useNavigate } from "react-router-dom";
import '../../../css/Chatsignup.css';
const Chatsignup = () => {
    const { googleLogin, token } = useContext(ChatContext);
    console.log("cHATSIGNUPTOKEN", token)

    return (
        // <div>
        //     User Sign In
        //     <button onClick={googleLogin}>Google SignIn</button>
        // </div>
        <div className="Chatcontainer">
            <div className="Chatcontent">
                <h1 style={{
                    fontSize: "24px",
                    marginBottom: "10px"
                }}>Welcome to Chat App</h1>
                <p style={{
                    fontSize: "16px",
                    marginBottom: "20px"
                }}>Sign in with your Google account to get started.</p>
                <button className="google-button" onClick={googleLogin}>
                    Sign In with Google
                </button>
            </div>
        </div>
    )
}

export default Chatsignup
