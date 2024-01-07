import express from 'express';
import { verifyToken } from '../middleware/auth';
import {
    addLabelIdToTask,
    addUserToTask,
    createTask,
    getAllTasks,
    deleteLabelIdFromTask,
    deleteTask,
    deleteUserFromTask,
    updateTask
} from '../controllers/taskController';

const router = express.Router();

router.get('/', verifyToken, getAllTasks);
router.post('/', verifyToken, createTask);
router.post('/:taskId/users/:userName', verifyToken, addUserToTask);
router.post('/:taskId/labels/:labelId', verifyToken, addLabelIdToTask);
router.patch('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);
router.delete('/:taskId/users/:userName', verifyToken, deleteUserFromTask);
router.delete('/:taskId/labels/:labelId', verifyToken, deleteLabelIdFromTask);

export default router;
