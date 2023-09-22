import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded, onValue } from "firebase/database";
import '../../../css/chat.css'
import { ChatContext } from './ChatContext'
import { useParams } from 'react-router-dom';


const ChatList = () => {
    const { id } = useParams();
    const [chats, setchats] = useState([])
    const [msg, setmsg] = useState("")
    const [receiverId2, setReceiverId2] = useState(null);
    const [userData, setuserData] = useState([])
    console.log("uid", id)
    const { user, googleLogin, selectedUserId, uniqueID, uid } = useContext(ChatContext);
    console.log("selectedUserId", selectedUserId)
    const db = getDatabase();  //allows you to access the Realtime Database


    useEffect(() => {
        ChildAdded();
    }, [uid, id])


    useEffect(() => {

        const userpath = `users/${uid}`
        const contactPath = `users/${uid}/contacts/${selectedUserId}`;
        console.log("contactPath", contactPath)
        const contactRef = ref(db, contactPath);
        const userRef = ref(db, userpath);


        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            console.log(" userData", userData);
            console.log(" userDataName", userData.name)
            setuserData(userData)

        });
        onValue(contactRef, (snapshot) => {
            const contactData = snapshot.val();
            console.log("contactData", contactData);
            const receiverId = contactData?.['RecieverId'];
            // const receiverId = contactData?.['ReceiverId'];
            console.log("receiverId", receiverId)
            setReceiverId2(receiverId);
        });
    }, [uid, id]);


    //Get all messages from reatimeDatabase and store in array
    const messagePath = `users/${uid}/contacts/${selectedUserId}/messages`;
    const messageRef = ref(db, messagePath);
    const ChildAdded = () => {
        console.log("line51")
        onChildAdded(messageRef, (data) => {
            console.log("MESSAGES")
            onValue(messageRef, (snapshot) => {
                const mData = snapshot.val();
                console.log(" mData", mData);
                // Convert the message data object into an array of messages
                const messagesArray = Object.values(mData);
                setchats(messagesArray);
                // Set the messages in the chats array

            });
            console.log("data.val()", data.val());
            console.log("QWE", chats, data.val(), chats.length)
            const existingMessageIndex = chats.findIndex((message) => message.timestamp === data.val().timestamp);


            updateHeight();
        }, 100);
    }



    const updateHeight = () => {
        const el = document.getElementById('chat');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }


    const handleMessage = () => {
        if (msg.trim() === "") return; // Don't send empty messages
        console.log("Message")

        // Get the reference to the contact's messages node
        const senderContactMessagesRef = ref(db, `users/${uid}/contacts/${id}/messages`);
        const receiverContactMessagesRef = ref(db, `users/${receiverId2}/contacts/${id}/messages`);

        console.log("receiverContactMessagesRef", `users/${receiverId2}/contacts/${id}/messages`);
        // // Create a new message reference
        const newSenderMessageRef = push(senderContactMessagesRef);
        const newReceiverMessageRef = push(receiverContactMessagesRef);
        console.log("newReceiverMessageRef", newReceiverMessageRef)
        // Create a message object with text, sender, and timestamp
        const messageData = {
            text: msg,
            sender: uid, // Assuming uid represents the sender's ID
            timestamp: Date.now(),
        };

        // Set the message data under the newly generated message references for both sender and receiver
        Promise.all([
            set(newSenderMessageRef, messageData),
            set(newReceiverMessageRef, messageData),
        ])
            .then(() => {
                setmsg(""); // Clear the input field after sending the message
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });

        setmsg('');
    }

    console.log("chatlist", chats)
    return (
        <div>
            <h1>User:  {userData.name}</h1>

            {selectedUserId ? (<div className="Chatbox">

                <div id="chat">
                    {chats.map((message, index) => (
                        <div key={index} className={`container ${message.sender === uid ? 'me' : ''}`}>
                            <p className={`chatbox ${message.sender === uid ? 'me' : ''}`}>

                                <span>{message.text}</span>
                            </p>
                        </div>
                    ))}

                </div>
                <div className="btm-chatbox">
                    <input type="text" value={msg} placeholder="Enter your chat" onChange={(e) => setmsg(e.target.value)} style={{ flexGrow: 1, padding: "20px" }}></input>
                    <button type="button" style={{ backgroundColor: "cadetblue", padding: "0px 10px 0px 10px" }} onClick={handleMessage}>Send</button>
                </div></div>) : <h1 style={{ textAlign: "center", fontSize: "24px", color: "#888" }}>No Chat selected</h1>
            }

        </div>

    )
}

export default ChatList

