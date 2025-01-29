const socket = io();
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messages");
const roomInput = document.getElementById("roomInput");

// ฟังก์ชันเข้าห้องแชท
function joinRoom() {
    const room = roomInput.value.trim();
    if (room) {
        socket.emit('join room', room); // เข้าห้องแชท
        document.getElementById('room-form').style.display = 'none';
        document.getElementById('messages').style.display = 'block';
    }
}

// ฟังก์ชันส่งข้อความ
function sendMessage() {
    const msg = messageInput.value.trim();
    const room = roomInput.value.trim();
    if (msg && room) {
        // แสดงข้อความของตัวเอง (ไม่ซ้ำ)
        displayMessage(msg, 'user-message');
        messageInput.value = "";
        // ส่งข้อความไปยังห้อง (แต่จะไม่ให้มันแสดงในฝั่งผู้ส่ง)
        socket.emit('chat message', msg, room);
    }
}

// ฟังก์ชันแสดงข้อความในหน้าจอ
function displayMessage(msg, type) {
    const messageElement = document.createElement("div");
    messageElement.textContent = msg;
    messageElement.classList.add("message", type);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// เมื่อได้รับข้อความจากห้อง (จากผู้ใช้คนอื่น)
socket.on("chat message", (msg) => {
    displayMessage(msg, "other-message"); // แสดงข้อความจากผู้ใช้อื่น
});
