import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded, remove, onValue } from "firebase/database";
import { BsFillChatLeftFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import '../../../css/Chatcontact.css';
import { ChatContext } from './ChatContext';
const ChatContact = () => {
    const { selectedUserId, setSelectedUserId, uniqueId, setuniqueId } = useContext(ChatContext);
    const [contacts, setcontacts] = useState([])

    const db = getDatabase();
    const selectContact = (userId) => {
        console.log(userId);
        setSelectedUserId(userId)
    }
    useEffect(() => {
        // Reference to the Firebase database location where your data is stored
        const dataRef = ref(db, "contacts"); // Replace with your actual data path

        // Attach an event listener to retrieve data
        onValue(dataRef, (snapshot) => {
            const dataArr = [];

            // Iterate through each child node and push its value to the array
            snapshot.forEach((childSnapshot) => {
                const uniqueID = childSnapshot.key;
                setuniqueId(uniqueID)
                const childData = childSnapshot.val();
                console.log("childData", childData);

                // Create a new object that includes the id field
                const newData = {
                    id: uniqueID,
                    ...childData, // Include other properties from childData
                };

                // Push the new object to the array
                dataArr.push(newData);
                // dataArr.push(childData);
            });

            // Update the state with the retrieved data
            setcontacts(dataArr);
        });
    }, []);
    console.log('--------------------------------', uniqueId)
    console.log("contact", contacts)
    return (

        <>
            <div className="contact-list-container">
                <div className="contact-list-header">Mernchat <BsFillChatLeftFill className="chat-icon" /></div>
                <div className="online-people-list">
                    {contacts.map((people, index) => (
                        <Link to={`/chat/${people.id}`}>
                            <div key={index} onClick={() => selectContact(people.id)} className={`online-person ${selectedUserId === people.id ? 'bg-blue' : ''}`} >
                                <div className="aavtar" ><Avatar username={people.name} userId={people.id} /></div>
                                {people.name}

                            </div>
                        </Link>
                    ))}




                </div>
            </div>
        </>

    )
}

export default ChatContact 
