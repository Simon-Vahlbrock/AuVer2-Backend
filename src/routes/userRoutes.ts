import express from 'express';
import { registerUser, loginUser, getAllUsernames } from '../controllers/userController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/register/:boardId', registerUser);
router.post('/login/:boardId', loginUser);

router.get('/:boardId', verifyToken, getAllUsernames);

export default router;
