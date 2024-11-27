import { Router } from 'express';
import * as roomController from '../controllers/room.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// protect all routes in this file
router.use(authorize);

// route to create a new room
router.route('/').post(roomController.createRoom);

// route to get all rooms
router.route('/').get(roomController.getAllRooms);

// route to get a room by id
router.route('/:roomId').get(roomController.getRoomById);

// route to join a room by id
router.route('/:roomId/join').post(roomController.joinRoom);

// route to leave a room by id
router.route('/:roomId/leave').post(roomController.leaveRoom);

// route to get messages of a room by id
router.route('/:roomId/messages').get(roomController.getMessages);

// route to send a message to a room by id
router.route('/:roomId/messages').post(roomController.sendMessage);

export default router;
