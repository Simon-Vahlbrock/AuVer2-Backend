import express from 'express';
import { registerUser, loginUser, getAllUsers, refreshTokens } from '../controllers/userController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshTokens);


export default router;
