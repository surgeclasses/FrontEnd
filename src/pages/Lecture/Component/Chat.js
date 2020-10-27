import React from "react";

import './Chat.css'

const Chat = () => {
  return (
      <div className="chat-section">
        <h3>Query Chat</h3>
        <textarea className="chat-area"></textarea>
        <input className="chat-input" type='text'/>
      </div>
  );
};

export default Chat;
