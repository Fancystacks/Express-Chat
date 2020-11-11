const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log("New Web Socket Connection...");

    socket.emit('message', 'Welcome to Express Chat!');

    socket.broadcast.emit('message', 'A user has joined the chat'); // broadcast to all other users

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`));