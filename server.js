const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connect', (socket) => {
    console.log("New Web Socket Connection...");
})
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`));

