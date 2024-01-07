import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', verifyToken, getAllUsers);

export default router;
