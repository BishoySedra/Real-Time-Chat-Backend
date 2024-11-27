import { rooms } from '../data/rooms.js';
import { createCustomError } from '../middlewares/errors/customError.js';

export const createRoom = async (name, userId) => {
    const room = {
        id: rooms.length + 1,
        name,
        users: [userId],
        messages: [],
    };

    rooms.push(room);

    return room;
};

export const getAllRooms = async () => {
    return rooms;
};

export const getRoomById = async (roomId) => {
    const room = rooms.find((room) => room.id === parseInt(roomId));
    if (!room) {
        throw createCustomError("Room not found!", 404, null);
    }
    return room;
};

export const joinRoom = async (roomId, userId) => {
    const room = rooms.find((room) => room.id === parseInt(roomId));
    if (!room) {
        throw createCustomError("Room not found!", 404, null);
    }
    if (room.users.includes(userId)) {
        throw createCustomError("User already in the room!", 409, null);
    }
    room.users.push(userId);
    return room;
};

export const leaveRoom = async (roomId, userId) => {
    const room = rooms.find((room) => room.id === parseInt(roomId));
    if (!room) {
        throw createCustomError("Room not found!", 404, null);
    }
    if (!room.users.includes(userId)) {
        throw createCustomError("User not in the room!", 409, null);
    }
    room.users = room.users.filter((id) => id !== userId);

    // check if the room is empty
    if (room.users.length === 0) {
        // pop the room from the rooms array
        const index = rooms.indexOf(room);
        rooms.splice(index, 1);
    }

    return room;
};

export const getMessages = async (roomId) => {
    const room = rooms.find((room) => room.id === parseInt(roomId));
    if (!room) {
        throw createCustomError("Room not found!", 404, null);
    }
    return room.messages;
};

export const sendMessage = async (roomId, senderId, messageContent) => {
    const room = rooms.find((room) => room.id === parseInt(roomId));
    if (!room) {
        throw createCustomError("Room not found!", 404, null);
    }
    if (!room.users.includes(senderId)) {
        throw createCustomError("User not in the room!", 409, null);
    }
    const foundUser = users.find((user) => user.id === senderId);
    const message = {
        id: room.messages.length + 1,
        sender: foundUser.username,
        messageContent,
        timestamp: new Date().toISOString(),
    };
    room.messages.push(message);
    return message;
};
