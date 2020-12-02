const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

chatForm.addEventListener('submit' , (event) => {
    event.preventDefault();
    const msg = event.target.elements.msg.value;
    console.log(msg);
});