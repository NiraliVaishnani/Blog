
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
