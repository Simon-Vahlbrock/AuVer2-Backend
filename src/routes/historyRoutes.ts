import express from 'express';
import { verifyToken } from '../middleware/auth';
import { createHistoryEntry, getAllHistoryEntries, updateHistoryEntry } from '../controllers/historyController';

const router = express.Router();

router.get('/', verifyToken, getAllHistoryEntries);
router.post('/', verifyToken, createHistoryEntry);
router.patch('/:historyId', verifyToken, updateHistoryEntry);

export default router;
