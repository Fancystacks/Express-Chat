const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMsg = require('./utils/messages');
const { userJoin, getCurrentUser, getRoomUsers, userLeave } = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ExpressChat Bot';

// runs when client connects
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // welcomes current user
        socket.emit('message', formatMsg(botName, 'Welcome to Express Chat!'));
        // broadcast to channel when user connects
        socket.broadcast
        .to(user.room)
        .emit(
            'message', 
            formatMsg(botName, `${user.username} has joined the chat`));

            // send users and chat room name
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
    });

    // listening for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMsg(user.username, msg));
    });

    // runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.emit('message', formatMsg(botName, `${user.username} has left the chat`));

        // send users and chat room name
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`));