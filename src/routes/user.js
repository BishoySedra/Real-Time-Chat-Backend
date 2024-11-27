import { Router } from 'express';
import * as userController from '../controllers/user.js';

const router = Router();

// route to get all users
router.route('/').get(userController.getAllUsers);

// route to get a user by id
router.route('/:userId').get(userController.getUserById);

export default router;

