import React, { useContext } from 'react'
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { auth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../../../css/chat.css'
import ChatList from './ChatList';
import { ChatContext } from './ChatContext';
import ChatContact from './ChatContact';
const Chat = () => {
    console.log("klkl")
    const { user, setUser, googleLogin } = useContext(ChatContext);
    const db = getDatabase();
    const chatListRef = ref(db, 'chats');
    const contactsRef = ref(db, 'contacts');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return (
        <div className="ChatContainer">
            <div className="ContactListContainer"><ChatContact /></div>
            <div className="ChatListContainer">  <ChatList /></div>
        </div>
    )
}

export default Chat
