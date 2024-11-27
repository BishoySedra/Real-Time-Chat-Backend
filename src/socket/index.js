import Express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as jwtOps from '../utils/jwt.js';
import { rooms } from '../data/rooms.js';
import * as userMethods from '../data/users.js';
import messageFormat from '../utils/messageMethods.js';

export const app = Express();
export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    },
});

const chatBotName = "Bortoqala";

io.on('connection', (socket) => {
    // get token from headers and must be in the format of "Bearer token"
    const token = socket.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
        socket.disconnect();
        return;
    }

    const decodedToken = jwtOps.verifyAccessToken(token);

    if (!decodedToken) {
        socket.disconnect();
        return;
    }

    console.log(`User connected: ${decodedToken.id}`);

    // when user joined
    socket.on("join-room", ({ room }, callback) => {

        // check if the room is provided
        if (!room) {
            return callback("Room is required!");
        }

        // check if room exists
        const roomExists = rooms.find(r => r.id === room);

        if (!roomExists) {
            return callback("Room not found!");
        }

        // check if the user is already in the room
        if (!roomExists.users.includes(decodedToken.id)) {
            roomExists.users.push(decodedToken.id);
        }

        // adding the user to online users
        const user = userMethods.joinUser(socket.id, decodedToken.username, room);

        // to specify a target room
        socket.join(user.room);

        // when current user connects
        socket.emit("message", messageFormat(chatBotName, "Welcome to chat!"));

        // when another user connects
        socket.broadcast
            .to(user.room)
            .emit("message", messageFormat(chatBotName, `${decodedToken.username} has Joined the chat!`));
    });

    // when chat message received
    socket.on("send-message", ({ messageContent }, callback) => {

        // check if message is provided
        if (!messageContent) {
            return callback("Message is required!");
        }

        // get current user info
        const user = userMethods.getCurrentUser(socket.id);

        // check if user exists
        if (!user) {
            return callback("You should join to this room first!");
        }

        const message = messageFormat(user.username, messageContent);

        // finding the room and pushing the message
        rooms.find(r => r.id === user.room).messages.push(message);

        io.to(user.room).emit("message", messageFormat(user.username, messageContent));
    });

    // when a user disconnects or leaving the room
    socket.on("disconnect", () => {

        // get current left user info
        const user = userMethods.leaveUser(socket.id);

        // removing the user from the room users
        const room = rooms.find(r => r.id === user.room);
        const index = room.users.indexOf(user.id);
        if (index !== -1) {
            room.users.splice(index, 1);
        }

        io.to(user.room).emit("message", messageFormat(chatBotName, `${user.username} has Left the chat!`));
    });
});