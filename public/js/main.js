const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// get user and room name from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// join chatroom
socket.emit('joinRoom', { username, room });

// get chat room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// message from server
socket.on('message', (message) => {
    console.log(message);
    sendoutMessage(message);
});

chatMessages.scrollTop = chatMessages.scrollHeight;

// submit message
chatForm.addEventListener('submit' , (event) => {
    event.preventDefault();

    const msg = event.target.elements.msg.value;
    socket.emit('chatMessage', msg);

    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

// send message to server
function sendoutMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`
}