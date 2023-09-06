import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { auth } from 'firebase/auth';
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../../../css/chat.css'
import { ChatContext } from './ChatContext'
const ChatList = () => {
    const { user, googleLogin } = useContext(ChatContext);
    const db = getDatabase();
    const chatListRef = ref(db, 'chats');

    // const [user, setuser] = useState("");
    const [chats, setchats] = useState([])
    const [msg, setmsg] = useState("")

    useEffect(() => {
        ChildAdded();
    }, [])

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
        // el.scrollTop = el.scrollHeight;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
        else {
            // console.log("9999999")
        }
    }
    const handleMessage = () => {
        console.log("Message")
        // Create a new post reference with an auto-generated id
        const chatRef = push(chatListRef);
        set(chatRef, {
            user, message: msg
        });
        setmsg('');
    }
    console.log("chatlist", chats)
    return (
        <div>

            {user ? null : (<><button onClick={googleLogin}>Google SignIn</button></>)}
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
            {/* <div>
                <div className='chating'><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6><h6>hyyyy</h6></div>
                <div className="seingkey"><input type="text" placeholder="enter yor msg"></input><button>click here</button></div>

            </div> */}


        </div>
    )
}

export default ChatList
