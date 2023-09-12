// import React, { useContext, useEffect, useState } from 'react'
// import { getDatabase, ref, push, set, onChildAdded, remove, onValue } from "firebase/database";
// import { BsFillChatLeftFill } from 'react-icons/bs';
// import { Link, useParams } from 'react-router-dom';
// import Avatar from './Avatar';
// import '../../../css/Chatcontact.css';
// import { ChatContext } from './ChatContext';
// const ChatContact = () => {
//     const { selectedUserId, setSelectedUserId, uniqueId, setuniqueId, uid } = useContext(ChatContext);
//     const [contacts, setcontacts] = useState([])

//     const db = getDatabase();
//     const selectContact = (userId) => {
//         console.log(userId);
//         setSelectedUserId(userId)
//     }
//     useEffect(() => {
//         // Reference to the Firebase database location where your data is stored
//         const dataRef = ref(db, "contacts"); // Replace with your actual data path

//         // Attach an event listener to retrieve data
//         onValue(dataRef, (snapshot) => {
//             const dataArr = [];

//             // Iterate through each child node and push its value to the array
//             snapshot.forEach((childSnapshot) => {
//                 const uniqueID = childSnapshot.key;
//                 console.log("childSnapshot", uniqueID);
//                 // setuniqueId(uniqueID)
//                 const childData = childSnapshot.val();
//                 console.log("childData", childData);

//                 // Create a new object that includes the id field
//                 const newData = {
//                     id: uniqueID,
//                     ...childData, // Include other properties from childData
//                 };

//                 // Push the new object to the array
//                 dataArr.push(newData);
//                 // dataArr.push(childData);
//             });

//             // Update the state with the retrieved data
//             setcontacts(dataArr);
//         });
//     }, []);
//     console.log('--------------------------------', uniqueId)
//     console.log("contact", contacts)
//     return (

//         <>
//             <div className="contact-list-container">
//                 <div className="contact-list-header">Mernchat <BsFillChatLeftFill className="chat-icon" /></div>
//                 <div className="online-people-list">
//                     {contacts.map((people, index) => (

//                         <Link to={`/chat/${uid}/${people.id}`}>
//                             <div key={index} onClick={() => selectContact(people.id)} className={`online-person ${selectedUserId === people.id ? 'bg-blue' : ''}`} >
//                                 <div className="aavtar" ><Avatar username={people.name} userId={people.id} /></div>
//                                 {people.name}

//                             </div>
//                         </Link>
//                     ))}




//                 </div>
//             </div>
//         </>

//     )
// }

// export default ChatContact 




import React, { useContext, useEffect, useState } from 'react';
import { getDatabase, ref, push, set, onChildAdded, onValue } from "firebase/database";
import { BsFillChatLeftFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import '../../../css/Chatcontact.css';
import { ChatContext } from './ChatContext';

const ChatContact = () => {
    const { selectedUserId, setSelectedUserId, uid } = useContext(ChatContext);
    const [contacts, setContacts] = useState([]);
    const [newContactName, setNewContactName] = useState('');
    const [newContactEmail, setNewContactEmail] = useState('');

    const db = getDatabase();

    const selectContact = (userId) => {
        setSelectedUserId(userId);
    }

    const addContact = () => {
        const contactsRef = ref(db, `users/${uid}/contacts`);
        const newContactRef = push(contactsRef);

        // Create a new contact data object
        const contactData = {
            name: newContactName,
            email: newContactEmail,
        };

        // Set the contact data under the newly generated key
        set(newContactRef, contactData)
            .then(() => {
                console.log("Contact added successfully.");
                // Clear input fields after adding a contact
                setNewContactName('');
                setNewContactEmail('');
            })
            .catch((error) => {
                console.error("Error adding contact: ", error);
            });
    };

    useEffect(() => {
        // Reference to the Firebase database location where your data is stored
        const dataRef = ref(db, `users/${uid}/contacts`);

        // Attach an event listener to retrieve data
        onValue(dataRef, (snapshot) => {
            const dataArr = [];

            // Iterate through each child node and push its value to the array
            snapshot.forEach((childSnapshot) => {
                const uniqueID = childSnapshot.key;

                const childData = childSnapshot.val();

                // Create a new object that includes the id field
                const newData = {
                    id: uniqueID,
                    ...childData, // Include other properties from childData
                };

                // Push the new object to the array
                dataArr.push(newData);
            });

            // Update the state with the retrieved data
            setContacts(dataArr);
        });
    }, [uid]);

    return (
        <>
            <div className="contact-list-container">
                <div className="contact-list-header">Mernchat <BsFillChatLeftFill className="chat-icon" /></div>
                <div className="online-people-list">
                    {contacts.map((contact, index) => (
                        <Link to={`/chat/${uid}/${contact.id}`} key={index} contactId={contact.id}>
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
                <div className="add-contact">
                    <h3>Add Contact</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newContactEmail}
                        onChange={(e) => setNewContactEmail(e.target.value)}
                    />
                    <button onClick={addContact}>Add Contact</button>
                </div>
            </div>
        </>
    );
}

export default ChatContact;

