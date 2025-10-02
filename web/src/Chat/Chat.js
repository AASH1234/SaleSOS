import React, { useState } from 'react';
import './Chat.css';

const sampleChats = [
  {
    id: 1,
    name: 'John Doe',
    messages: [
      { sender: 'John Doe', text: 'Hey, how are you?' },
      { sender: 'Me', text: 'I am good, thanks! How about you?' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    messages: [
      { sender: 'Jane Smith', text: 'Are we still on for the meeting tomorrow?' },
      { sender: 'Me', text: 'Yes, see you at 10 AM.' },
    ],
  },
];

function Chat() {
  const [selectedChat, setSelectedChat] = useState(sampleChats[0]);

  return (
    <div className="chat-container">
      <div className="chat-list">
        {sampleChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-list-item ${selectedChat.id === chat.id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat.name}
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <h3>{selectedChat.name}</h3>
        </div>
        <div className="chat-messages">
          {selectedChat.messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'Me' ? 'sent' : 'received'}`}>
              <div className="message-sender">{message.sender}</div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;