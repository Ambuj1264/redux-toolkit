"use client";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import io from 'socket.io-client';
import './Chat.css';

// Define the message type
interface Message {
  _id: string;
  text: string;
}

const socket = io('http://localhost:5000');

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    // Receive previous messages
    socket.on('previousMessages', (msgs: Message[]) => {
      setMessages(msgs.reverse());
    });

    // Receive new messages
    socket.on('message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('previousMessages');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
    <div className="chat-container">
      <h1>Chat Room</h1>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
    </>
  );
};

export default Chat;
