const chatForm = document.getElementById('chat-form');

const socket = io();

// message from server
socket.on('message', (message) => {
    console.log(message);
    sendoutMessage(message);
});

// submit message
chatForm.addEventListener('submit' , (event) => {
    event.preventDefault();
    const msg = event.target.elements.msg.value;
    socket.emit('chatMessage', msg);
});

function sendoutMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
      ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}