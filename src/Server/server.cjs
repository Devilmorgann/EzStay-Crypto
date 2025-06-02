const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('new-user', (username) => {
    socket.username = username || 'Anonymous';
    io.emit('user-joined', socket.username);
  });

  socket.on('send-chat-message', (data) => {
    io.emit('chat-message', {
      user: socket.username || 'Anonymous',
      text: data.text,
      media: data.media || null,
    });
  });

  socket.on('disconnect', () => {
    io.emit('user-left', socket.username || 'A user');
  });
});

server.listen(5000, () => {
  console.log('✅ Server running on port 5000');
});
