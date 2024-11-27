import * as roomService from '../services/room.js';

export const createRoom = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.userId;
        const room = await roomService.createRoom(name, userId);
        res.status(201).json({
            message: "Room created successfully!",
            body: room,
            status: 201,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json({
            message: "All rooms fetched successfully!",
            body: rooms,
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const getRoomById = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const room = await roomService.getRoomById(roomId);
        res.status(200).json({
            message: "Room fetched successfully!",
            body: room,
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const joinRoom = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const userId = req.userId;
        const room = await roomService.joinRoom(roomId, userId);
        res.status(200).json({
            message: "Room joined successfully!",
            body: room,
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const leaveRoom = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const userId = req.userId;
        const room = await roomService.leaveRoom(roomId, userId);
        res.status(200).json({
            message: "Room left successfully!",
            body: room,
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const messages = await roomService.getMessages(roomId);
        res.status(200).json({
            message: "Messages fetched successfully!",
            body: messages,
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        const userId = req.userId;
        const { messageContent } = req.body;
        const message = await roomService.sendMessage(roomId, userId, messageContent);
        res.status(201).json({
            message: "Message sent successfully!",
            body: message,
            status: 201,
        });
    } catch (error) {
        next(error);
    }
};
