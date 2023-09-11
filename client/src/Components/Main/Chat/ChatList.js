import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { auth } from 'firebase/auth';
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../../../css/chat.css'
import { ChatContext } from './ChatContext'
import { Link, useParams } from 'react-router-dom';
const ChatList = () => {
    const { uid } = useParams();
    //console.log("uid", uid)
    const { user, googleLogin, selectedUserId, uniqueID } = useContext(ChatContext);
    console.log("selectedUserId", selectedUserId)
    console.log("uniqueID", uniqueID)
    const db = getDatabase();  //allows you to access the Realtime Database
    const chatListRef = ref(db, 'chats');//ref function is used to specify a location in the database
    const [chats, setchats] = useState([])
    const [msg, setmsg] = useState("")

    useEffect(() => {
        ChildAdded();
    }, [])

    //Get all messages from reatimeDatabase and store in array
    const ChildAdded = () => {
        console.log("line51")
        onChildAdded(chatListRef, (data) => {
            console.log("MESSAGES")
            //   console.log(data.val());
            console.log("QWE", chats, data.val(), chats.length)
            setchats(chats => [...chats, data.val()]);
            updateHeight();
        }, 100);
    }

    const updateHeight = () => {
        const el = document.getElementById('chat');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }

    //Add message to database 
    const handleMessage = () => {
        console.log("Message")

        const chatRef = push(chatListRef);//line generates a new unique key 
        set(chatRef, {
            user, message: msg
        });
        setmsg('');
    }
    console.log("chatlist", chats)
    return (
        <div>

            {/* {user ? null : (<><button onClick={googleLogin}>Google SignIn</button></>)} */}
            {user.email ? (<div className="Chatbox">
                <h1>User:{user.name}</h1>

                <div id="chat">
                    {chats.map((c, index) => (
                        <div key={index} className={`container ${c.user.email === user.email ? 'me' : " "}`}>
                            <p className={`chatbox ${c.user.email === user.email ? 'me' : " "}`}>
                                <strong>{c.user.name}</strong>
                                <span>{c.message}</span>
                            </p>
                        </div>
                    ))}  </div>
                <div className="btm-chatbox">
                    <input type="text" value={msg} placeholder="Enter your chat" onChange={(e) => setmsg(e.target.value)} style={{ flexGrow: 1, padding: "20px" }}></input>
                    <button type="button" style={{ backgroundColor: "cadetblue", padding: "0px 10px 0px 10px" }} onClick={handleMessage}>Send</button>
                </div></div>) : null}

            {selectedUserId ? (<Link to={`/chat/${uniqueID}/${selectedUserId}`}><h1>hyy${uid}${selectedUserId}</h1></Link>) : null}
            hyy
        </div>

    )
}

export default ChatList
