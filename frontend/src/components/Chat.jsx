import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message';

const socket = io(process.env.REACT_APP_SOCKET_URL);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div className="p-10 md:px-28 md:py-16 h-[92vh] flex flex-col items-center justify-center bg-slate-200">
      <div className="w-full h-full overflow-y-scroll border border-gray-300 p-4 mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <Message key={index} text={msg} />
        ))}
      </div>
      <div className="w-full flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-slate-500 text-white rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
