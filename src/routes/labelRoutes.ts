import express from 'express';
import { getAllLabels, createLabel, updateLabel } from '../controllers/labelsController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAllLabels);
router.post('/', createLabel);
router.patch('/:id', updateLabel);

export default router;
