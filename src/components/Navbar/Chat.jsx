import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUsername = prompt('Enter your name:', 'You') || 'Anonymous';
    setUsername(storedUsername);
    socket.emit('new-user', storedUsername);

    socket.on('chat-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('user-joined', (name) => {
      setMessages((prev) => [...prev, { type: 'system', text: `${name} joined the chat` }]);
    });

    socket.on('user-left', (name) => {
      setMessages((prev) => [...prev, { type: 'system', text: `${name} left the chat` }]);
    });

    return () => {
      socket.off('chat-message');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, []);

  const handleSend = () => {
    if (message.trim() || file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const msgData = { user: username, text: message, media: e.target.result };
          socket.emit('send-chat-message', msgData);
          setMessage('');
          setFile(null);
          fileInputRef.current.value = '';
        };
        reader.readAsDataURL(file);
      } else {
        const msgData = { user: username, text: message };
        socket.emit('send-chat-message', msgData);
        setMessage('');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="app">
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          margin: '20px auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#fff',
          }}
        >
          Team Chat
        </div>

        <div
          ref={chatRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '400px',
            overflowY: 'auto',
            marginBottom: '20px',
            paddingRight: '10px',
          }}
        >
          {messages.map((msg, index) => {
            const isSelf = msg.user === username;
            return (
              <div
                key={index}
                style={{
                  marginBottom: '16px',
                  background: msg.type === 'system' ? '#333' : '#1e1e2f',
                  padding: '10px',
                  borderRadius: '8px',
                  color: msg.type === 'system' ? '#ccc' : '#fff',
                  wordBreak: 'break-word',
                  maxWidth: '70%',
                  alignSelf: isSelf ? 'flex-end' : 'flex-start',
                  marginLeft: isSelf ? 'auto' : 0,
                }}
              >
                {msg.type !== 'system' && !isSelf && (
                  <strong style={{ color: '#90caf9' }}>{msg.user}: </strong>
                )}
                {msg.text && <span>{msg.text}</span>}
                {msg.media && (
                  <div style={{ marginTop: '8px' }}>
                    <img src={msg.media} alt="Sent media" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flexGrow: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              backgroundColor: '#222',
              color: '#fff',
              fontFamily: "'Outfit', sans-serif",
            }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            onClick={triggerFileInput}
            style={{
              background: '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 12px',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            📎
          </button>
          <button
            onClick={handleSend}
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
