import React, { useContext } from 'react'
import { ChatContext } from './ChatContext';
import { useNavigate } from "react-router-dom";

const Chatsignup = () => {
    const { googleLogin, token } = useContext(ChatContext);
    console.log("cHATSIGNUPTOKEN", token)

    return (
        <div>
            <button onClick={googleLogin}>Google SignIn</button>
        </div>
    )
}

export default Chatsignup
