import express from 'express';
import { registerUser, loginUser, getAllUsernames } from '../controllers/userController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', verifyToken, getAllUsernames);

export default router;
