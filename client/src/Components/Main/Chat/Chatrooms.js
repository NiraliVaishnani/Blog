import React from 'react'
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
const Chatrooms = () => {
    const db = getDatabase();
    const chatRoomRef = ref(db, 'chatsRoom');
    return (
        <div>

        </div>
    )
}

export default Chatrooms
