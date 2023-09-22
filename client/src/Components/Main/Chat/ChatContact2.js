
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded, remove } from "firebase/database";
const ChatContact2 = () => {
    const [contacts, setcontacts] = useState([])
    const db = getDatabase();
    const contactsRef = ref(db, 'contacts');

    const contact1 = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
    };

    const contact2 = {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '987-654-3210',
    };

    const contact3 = {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '555-555-5555',
    };


    const contactRef1 = push(contactsRef);
    const contactRef2 = push(contactsRef);
    const contactRef3 = push(contactsRef);

    set(contactRef1, contact1)
        .then(() => {
            console.log('Contact 1 added successfully!');
        })
        .catch((error) => {
            console.error('Error adding contact 1: ', error);
        });

    set(contactRef2, contact2)
        .then(() => {
            console.log('Contact 2 added successfully!');
        })
        .catch((error) => {
            console.error('Error adding contact 2: ', error);
        });

    set(contactRef3, contact3)
        .then(() => {
            console.log('Contact 3 added successfully!');
        })
        .catch((error) => {
            console.error('Error adding contact 3: ', error);
        });





    return (

        <div>

        </div>
    )
}

export default ChatContact2


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