import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded, onValue } from "firebase/database";
import '../../../css/chat.css'
import { ChatContext } from './ChatContext'
import { Link, useParams } from 'react-router-dom';


const ChatList = () => {
    const { id, contactId } = useParams();
    console.log('contactId', contactId);
    const [uniqueId2, setuniqueId2] = useState(null);
    console.log("uid", id)
    //  setuniqueId2(uid);
    console.log("setuniqueId2", uniqueId2)
    const { user, googleLogin, selectedUserId, uniqueID, uid } = useContext(ChatContext);
    console.log("selectedUserId", selectedUserId)
    console.log("uniqueID", uniqueID)
    const db = getDatabase();  //allows you to access the Realtime Database
    const chatListRef = ref(db, 'users');//ref function is used to specify a location in the database
    const [chats, setchats] = useState([])
    const [msg, setmsg] = useState("")
    // Create chatId and chatRef
    const chatId = `${user.uid}-${selectedUserId}`;
    const chatRef = ref(db, `chats/${chatId}`);
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
    // const handleMessage = () => {
    //     console.log("Message")

    //     const chatRef = push(chatListRef);//line generates a new unique key
    //     set(chatRef, {
    //         user, message: msg
    //     });
    //     setmsg('');
    // }



    const handleMessage = () => {
        if (msg.trim() === "") return; // Don't send empty messages
        console.log("Message")
        // Get the reference to the contact's messages node
        const contactMessagesRef = ref(db, `users/${uid}/contacts/${id}/messages`);

        // Create a new message reference
        const newMessageRef = push(contactMessagesRef);

        // Create a message object with text, sender, and timestamp
        const messageData = {
            text: msg,
            sender: uid, // Assuming uid represents the sender's ID
            timestamp: Date.now(),
        };



        // // Set the message data under the newly generated message reference
        // set(newMessageRef, messageData)
        //     .then(() => {
        //         setmsg(""); // Clear the input field after sending the message
        //     })
        //     .catch((error) => {
        //         console.error("Error sending message:", error);
        //     });


        // Assuming you have a way to retrieve the receiver's UID (contactId), you can set the message for the receiver here
        const receiverUidRef = ref(db, `users`);
        onValue(receiverUidRef, (snapshot) => {
            const receiverUid = snapshot.val();
            console.log("snapshot.val()", snapshot.val())
            console.log("Receiver's UID:", receiverUid);

            // // Now you can use receiverUid to set the message for the receiver under their messages node
            // const receiverMessagesRef = ref(db, `users/${receiverUid}/contacts/${id}/messages`);
            // set(newMessageRefForReceiver, messageData)
            //     .then(() => {
            //         // Message sent successfully for the receiver
            //         console.log("Message sent successfully for receiver.");
            //         setmsg(""); // Clear the input field after sending the message
            //     })
            //     .catch((error) => {
            //         console.error("Error sending message for receiver:", error);
            //     });
        });


        setmsg('');
    }



    console.log("chatlist", chats)
    return (
        <div>
            hyy {id}
            {/* {selectedUserId ? (<div className="Chatbox">
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
                </div></div>) : <h1>No Chat selected</h1>} */}
            <div className="btm-chatbox">
                <input type="text" value={msg} placeholder="Enter your chat" onChange={(e) => setmsg(e.target.value)} style={{ flexGrow: 1, padding: "20px" }}></input>
                <button type="button" style={{ backgroundColor: "cadetblue", padding: "0px 10px 0px 10px" }} onClick={handleMessage}>Send</button>
            </div>
        </div>

    )
}

export default ChatList


