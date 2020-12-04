const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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