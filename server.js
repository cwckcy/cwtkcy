const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ให้ Express ให้บริการไฟล์ในโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    // เมื่อผู้ใช้เข้าห้องแชท
    socket.on('join room', (room) => {
        socket.join(room);  // ให้ผู้ใช้เข้าห้องที่ระบุ
        console.log(`User joined room: ${room}`);
        io.to(room).emit('chat message', `ผู้ใช้ใหม่เข้าห้อง: ${room}`);
    });

    // เมื่อผู้ใช้ส่งข้อความในห้องแชท
    socket.on('chat message', (msg, room) => {
        io.to(room).emit('chat message', msg);  // ส่งข้อความไปยังห้องที่ผู้ใช้เลือก
    });

    // เมื่อผู้ใช้ตัดการเชื่อมต่อ
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

