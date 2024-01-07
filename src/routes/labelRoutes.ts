import express from 'express';
import { getAllLabels, createLabel, updateLabel } from '../controllers/labelsController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/:boardId', verifyToken, getAllLabels);
router.post('/:boardId',verifyToken, createLabel);
router.patch('/:id', verifyToken, updateLabel);

export default router;
