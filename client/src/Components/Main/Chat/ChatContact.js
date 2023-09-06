import React, { useEffect, useState } from 'react'
import { getDatabase, ref, push, set, onChildAdded, remove, onValue } from "firebase/database";
const ChatContact = () => {
    const [contacts, setcontacts] = useState([])
    const db = getDatabase();
    // const contactsRef = ref(db, 'contacts');
    // Initialize Firebase and get a reference to the database




    // Use the 'remove' function to delete data at the specified location
    // remove(contactsRef)
    //     .then(() => {
    //         console.log('Data removed successfully.');
    //     })
    //     .catch((error) => {
    //         console.error('Error removing data:', error);
    //     });


    // useEffect(() => {
    //     ContactChildAdded();
    // }, [])
    // const ContactChildAdded = () => {
    //     console.log("Contact added")
    //     onChildAdded(contactsRef, (data) => {
    //         console.log("ContactChildAdded", data.val())
    //         //   console.log(data.val());
    //         // console.log("QWE", chats, data.val(), chats.length)
    //         setcontacts(contacts => [...contacts, data.val()]);

    //     }, 100);
    // }


    // Initialize an empty array to store the values

    useEffect(() => {
        // Reference to the Firebase database location where your data is stored
        const dataRef = ref(db, "contacts"); // Replace with your actual data path

        // Attach an event listener to retrieve data
        onValue(dataRef, (snapshot) => {
            const dataArr = [];

            // Iterate through each child node and push its value to the array
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                dataArr.push(childData);
            });

            // Update the state with the retrieved data
            setcontacts(dataArr);
        });
    }, []);

    console.log("contact", contacts)
    return (
        <div>
            {contacts.map((c, index) => (<div>{c.name}</div>))}
        </div>
    )
}

export default ChatContact 
