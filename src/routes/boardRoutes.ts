import express from 'express';
import { getAllBoards, createBoard, deleteBoard, updateBoard } from '../controllers/boardsController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/', verifyToken, getAllBoards);
router.post('/', verifyToken, createBoard);
router.patch('/:boardId', verifyToken, updateBoard);
router.delete('/:boardId', verifyToken, deleteBoard);

export default router;
