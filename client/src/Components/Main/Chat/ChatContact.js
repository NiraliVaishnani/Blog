import React, { useContext, useEffect, useState } from 'react';
import { getDatabase, ref, push, set, onChildAdded, onValue } from "firebase/database";
import { BsFillChatLeftFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import '../../../css/Chatcontact.css';
import { ChatContext } from './ChatContext';
import FileUploading from './FileUploading';

const ChatContact = () => {
    const { selectedUserId, setSelectedUserId, uid, contacts, setContacts } = useContext(ChatContext);
    console.log("ContextContact", contacts)
    //  const [newContactName, setNewContactName] = useState('');
    //  const [newContactEmail, setNewContactEmail] = useState('');

    const db = getDatabase();

    const selectContact = (userId) => {
        setSelectedUserId(userId);
    }

    // const addContact = () => {
    //     const contactsRef = ref(db, `users/${uid}/contacts`);
    //     const newContactRef = push(contactsRef);


    //     const contactData = {
    //         name: newContactName,
    //         email: newContactEmail,
    //     };


    //     set(newContactRef, contactData)
    //         .then(() => {
    //             console.log("Contact added successfully.");

    //             setNewContactName('');
    //             setNewContactEmail('');
    //         })
    //         .catch((error) => {
    //             console.error("Error adding contact: ", error);
    //         });
    // };

    // useEffect(() => {

    //     const dataRef = ref(db, `users/${uid}/contacts`);
    //     console.log("dataRef", `users / ${uid} / contacts`)
    //     // Attach an event listener to retrieve data
    //     onValue(dataRef, (snapshot) => {
    //         const dataArr = [];
    //         snapshot.forEach((childSnapshot) => {
    //             const uniqueID = childSnapshot.key;

    //             const childData = childSnapshot.val();
    //             const newData = {
    //                 id: uniqueID,
    //                 ...childData,
    //             };
    //             dataArr.push(newData);
    //         });
    //         setContacts(dataArr);
    //     });
    // }, [uid]);

    return (
        <>
            <div className="contact-list-container">
                <div className="contact-list-header">Mernchat <BsFillChatLeftFill className="chat-icon" /></div>
                <div className="online-people-list">
                    {contacts.map((contact, index) => (
                        <Link style={{ textDecoration: "none" }} to={`/chat/${uid}/${contact.id}`} key={index} contactId={contact.id}>
                            <div
                                onClick={() => selectContact(contact.id)}
                                className={`online-person ${selectedUserId === contact.id ? 'bg-blue' : ''}`}
                            >
                                <div className="avatar"><Avatar username={contact.name} userId={contact.id} /></div>
                                {contact.name}
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </>
    );
}

export default ChatContact;








