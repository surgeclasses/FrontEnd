import React, { useEffect, useState } from 'react';
import './ChatApp.css';
import Chat from './Chat';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChatUser from './ChatUser';
import SidebarChat from './SidebarChat';
import ReceiveChats from './ReceiveChats';

const ChatApp = () => {
  return (
    <div className = "chatApp">
        <div className = "chatApp__body">
          <ChatUser/>
          <Chat/>
        </div>
    </div>
    
  );
}

export default ChatApp;
