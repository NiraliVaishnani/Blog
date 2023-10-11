import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, push, set, onChildAdded, onValue, ref } from "firebase/database";
import '../../../css/chat.css'
import { ChatContext } from './ChatContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import FileUploading from './FileUploading';
import { getDownloadURL, getStorage, uploadBytes, ref as storageRef2 } from 'firebase/storage';
import { GrDocumentText } from 'react-icons/gr';

const ChatList = () => {
    const { id } = useParams();
    const [chats, setchats] = useState([])
    const [msg, setmsg] = useState("")
    const [receiverId2, setReceiverId2] = useState(null);
    const [userData, setuserData] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const storage = getStorage();
    const navigate = useNavigate();
    console.log("uid", id)
    const { user, googleLogin, selectedUserId, uniqueID, uid, name } = useContext(ChatContext);
    console.log("user", uid)
    console.log("selectedUserId", selectedUserId)
    const db = getDatabase();  //allows you to access the Realtime Database
    let messageData = {};

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
    console.log("messagePath", messagePath);
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

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        console.log("selectedFile", selectedFile)
    };
    const downloadFile = (fileName, fileUrl, isImage = false) => {
        if (isImage) {
            // Display the image
            window.open(fileUrl, '_blank');
            console.log("downloadFile", fileName, fileUrl)

        } else {
            console.log("downloadFile", fileName, fileUrl)
            const a = document.createElement('a');
            a.href = fileUrl;
            a.target = '_blank';
            a.click();
        }

    }


    // const handleMessage = async () => {
    //     // if (msg.trim() === "") return; // Don't send empty messages
    //     console.log("Message")

    //     // Get the reference to the contact's messages node
    //     const senderContactMessagesRef = ref(db, `users/${uid}/contacts/${id}/messages`);
    //     const receiverContactMessagesRef = ref(db, `users/${receiverId2}/contacts/${id}/messages`);

    //     console.log("receiverContactMessagesRef", `users/${receiverId2}/contacts/${id}/messages`);
    //     // // Create a new message reference
    //     const newSenderMessageRef = push(senderContactMessagesRef);
    //     const newReceiverMessageRef = push(receiverContactMessagesRef);
    //     console.log("newReceiverMessageRef", newReceiverMessageRef)
    //     if (selectedFile) {
    //         const fileRef = storageRef2(storage, `${uid}/${id}/${selectedFile.name}`);
    //         console.log("fileRef", fileRef, `${uid}/${id}/${selectedFile.name}`)
    //         uploadBytes(fileRef, selectedFile)
    //             .then((snapshot) => getDownloadURL(snapshot.ref))
    //             .then((url) => {
    //                 console.log('File URL', url);
    //                 setFileUrl(url);
    //                 messageData = {
    //                     file: {
    //                         fileName: selectedFile.name,
    //                         fileURL: url,

    //                     },
    //                     sender: uid, // Assuming uid represents the sender's ID
    //                     timestamp: Date.now(),
    //                 };
    //                 console.log("MessageDataaaaaaaaaaa", messageData);
    //             })
    //             .catch((error) => {
    //                 console.error('Error uploading file:', error);
    //             });



    //         // console.log("MessageDataaaaaa", messageData, "messageDataFile", messageData.file.fileURL);

    //     }
    //     else {
    //         messageData = {
    //             text: msg,
    //             sender: uid, // Assuming uid represents the sender's ID
    //             timestamp: Date.now(),
    //         };

    //     }


    //     // Set the message data under the newly generated message references for both sender and receiver
    //     Promise.all([

    //         set(newSenderMessageRef, messageData),
    //         set(newReceiverMessageRef, messageData),
    //     ])
    //         .then(() => {
    //             console.log("MessageData after sending:", messageData);
    //             setmsg(""); // Clear the input field after sending the message
    //         })
    //         .catch((error) => {
    //             console.error("Error sending message:", error);
    //         });

    //     setmsg('');
    // }
    const handleMessage = async () => {
        console.log("Message");

        // Get the reference to the contact's messages node
        const senderContactMessagesRef = ref(db, `users/${uid}/contacts/${id}/messages`);
        const receiverContactMessagesRef = ref(db, `users/${receiverId2}/contacts/${id}/messages`);

        // Create a new message reference
        const newSenderMessageRef = push(senderContactMessagesRef);
        const newReceiverMessageRef = push(receiverContactMessagesRef);


        if (selectedFile) {
            const fileRef = storageRef2(storage, `${uid}/${id}/${selectedFile.name}`);
            try {
                const snapshot = await uploadBytes(fileRef, selectedFile);
                const url = await getDownloadURL(snapshot.ref);

                console.log('File URL', url);
                setFileUrl(url);

                // Populate messageData with file information
                messageData = {
                    file: {
                        fileName: selectedFile.name,
                        fileURL: url,
                    },
                    sender: uid,
                    timestamp: Date.now(),
                };

                console.log("MessageDataaaaaaaaaaa", messageData);
            } catch (error) {
                console.error('Error uploading file:', error);
                return; // Don't proceed further if file upload fails
            }
        } else {
            messageData = {
                text: msg,
                sender: uid,
                timestamp: Date.now(),
            };
        }

        // Set the message data under the newly generated message references for both sender and receiver
        try {
            await Promise.all([
                set(newSenderMessageRef, messageData),
                set(newReceiverMessageRef, messageData),
            ]);

            console.log("MessageData after sending:", messageData);
            setmsg(""); // Clear the input field after sending the message
        } catch (error) {
            console.error("Error sending message:", error);
        }
        setmsg('');
    };



    const handleLogout = () => {
        console.log("logged out");
        localStorage.removeItem("chatlogin");

        navigate("/chat/signin");
    };
    console.log("chatlist", chats)
    return (
        <div>
            <div style={{ height: "60px" }}>
                <span style={{ fontSize: "26px" }}>User:  {name}</span>
                <span><button onClick={handleLogout} style={{
                    marginLeft: "20px", fontSize: "16px", marginTop: "5px",
                    fontWeight: "300", color: "white", backgroundColor: "#5072A7", borderRadius: "5px", padding: "10px"
                }}>Logout</button></span>
            </div>


            {
                selectedUserId ? (<div className="Chatbox">

                    <div id="chat">
                        {chats.map((message, index) => (
                            <div key={index} className={`container ${message.sender === uid ? 'me' : ''}`}>

                                <p className={`chatbox ${message.sender === uid ? 'me' : ''}`}>
                                    {message.text ? (
                                        <span>{message.text}</span>
                                    ) : message.file ? (
                                        message.file.fileName.toLowerCase().endsWith('.jpg') ||
                                            message.file.fileName.toLowerCase().endsWith('.jpeg') ||
                                            message.file.fileName.toLowerCase().endsWith('.png') ? (
                                            // Display an image if the file has a recognized image extension
                                            <img onClick={() => downloadFile(message.file.fileName, message.file.fileURL, true)}
                                                src={message.file.fileURL}
                                                alt={message.file.fileName}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '200px',
                                                }}
                                            />
                                        ) : (
                                            // Display other file types with a generic design
                                            <div onClick={() => downloadFile(message.file.fileName, message.file.fileURL)} style={{
                                                backgroundColor: message.sender === uid ? '#ADD8E6' : '#ffc87c',
                                                width: '350px',
                                                height: '35px',
                                                display: 'flex',
                                            }}>
                                                <span><GrDocumentText size={30} /></span>
                                                <span style={{ fontSize: '18px', marginLeft: '10px' }}>
                                                    {message.file.fileName}
                                                </span>
                                            </div>
                                        )
                                    ) : null}
                                </p>
                            </div>
                        ))}

                    </div>
                    <div className="btm-chatbox">
                        <input type="text" value={msg} placeholder="Enter your chat" onChange={(e) => setmsg(e.target.value)} style={{ flexGrow: 1, padding: "20px" }}></input>
                        {/* <FileUploading onFileSelect={handleFileSelect} /> */}
                        <FileUploading onFileSelect={handleFileSelect} />
                        <button type="button" style={{ backgroundColor: "cadetblue", padding: "0px 10px 0px 10px" }} onClick={handleMessage}>Send</button>
                    </div></div>) : <h1 style={{ textAlign: "center", fontSize: "24px", color: "#888" }}>No Chat selected</h1>
            }

        </div >

    )
}

export default ChatList

