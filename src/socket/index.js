import Express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as jwtOps from '../utils/jwt.js';
import { users } from '../data/users.js';
import { rooms } from '../data/rooms.js';

export const app = Express();
export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    },
});

io.on('connection', (socket) => {
    const token = socket.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
        socket.disconnect();
        return;
    }

    const user = jwtOps.verifyAccessToken(token);

    if (!user) {
        socket.disconnect();
        return;
    }

    console.log(`User connected: ${user.id}`);

    // Utility to find room by ID
    const findRoomById = (roomId) => rooms.find((room) => room.id === parseInt(roomId));

    // Send message
    socket.on('send-message', (message, roomId, callback) => {

        const room = findRoomById(roomId);

        if (!room) {
            return callback('Room not found!')
        };

        if (!room.users.includes(user.id)) {
            return callback('User not in the room!')
        };

        const newMessage = {
            id: room.messages.length + 1,
            senderId: user.id,
            messageContent: message,
            timestamp: new Date().toISOString(),
        };

        room.messages.push(newMessage);

        // Emit message to all users in the room
        io.to(roomId).emit('message', { sender: user.username, message: newMessage });
        callback({ message: 'Message sent!' });
    });

    // Join room
    socket.on('join-room', (roomId, callback) => {
        const room = findRoomById(roomId);

        if (!room) {
            return callback('Room not found!')
        };
        if (room.users.includes(user.id)) {
            return callback('User already in the room!')
        };

        room.users.push(user.id);
        socket.join(roomId);

        io.to(roomId).emit('room-data', room);
        callback({ message: 'Room joined!' });
    });

    // Leave room
    socket.on('leave-room', (roomId, callback) => {
        const room = findRoomById(roomId);

        if (!room) {
            return callback('Room not found!')
        };

        if (!room.users.includes(user.id)) {
            return callback('User not in the room!')
        };

        room.users = room.users.filter((id) => id !== user.id);
        socket.leave(roomId);

        if (room.users.length === 0) {
            const index = rooms.indexOf(room);
            rooms.splice(index, 1);
        }

        io.to(roomId).emit('room-data', room);
        callback({ message: 'Room left!' });
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${user.id}`);
    });
});
