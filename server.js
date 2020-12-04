const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMsg = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ExpressChat Bot';

// runs when client connects
io.on('connection', (socket) => {
    console.log("New Web Socket Connection...");
    // welcomes current user
    socket.emit('message', formatMsg(botName, 'Welcome to Express Chat!'));
    // broadcast to channel when user connects
    socket.broadcast.emit('message', formatMsg(botName, 'A user has joined the chat')); // broadcast to all other users

    // runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMsg(botName, 'A user has left the chat'));
    });

    // listening for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMsg('USER', msg));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`));