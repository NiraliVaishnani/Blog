import React, { useContext } from 'react'
import '../../../css/chat.css'
import ChatList from './ChatList';
import ChatContact from './ChatContact';
const Chat = () => {
    return (
        <div className="ChatContainer">
            <div className="ContactListContainer"><ChatContact /></div>
            <div className="ChatListContainer">  <ChatList /></div>
        </div>
    )
}

export default Chat
