import { Request, Response } from 'express';
import db from '../config/database';
import { sendDataToClients } from '../index';

export const getAllTasks = (req: Request, res: Response) => {
    const query = `
        SELECT tasks.id,
               title,
               text,
               boardId,
               GROUP_CONCAT(DISTINCT task_users.userName) AS assignedUserNames,
               GROUP_CONCAT(DISTINCT task_labels.labelId) AS assignedLabelIds
        FROM tasks
                 LEFT JOIN task_users ON tasks.id = task_users.taskId
                 LEFT JOIN task_labels ON tasks.id = task_labels.taskId
        GROUP BY tasks.id, title, text, boardId;
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        const tasks = results.map((task: any) => ({
            id: task.id,
            title: task.title,
            text: task.text,
            boardId: task.boardId,
            assignedUserNames: task.assignedUserNames ? task.assignedUserNames.split(',') : [],
            assignedLabelIds: task.assignedLabelIds ? task.assignedLabelIds.split(',') : [],
        }));

        res.json(tasks);
    });
};

export const createTask = (req: Request, res: Response) => {
    const { title, text, boardId } = req.body;

    const query = `
        INSERT INTO tasks (title, text, boardId)
        VALUES (?, ?, ?);
    `;

    db.query(query, [title, text, boardId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ id: results.insertId, title, text, boardId });
    });
};

export const updateTask = (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { title, text, boardId } = req.body;

    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating task - get current task' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const currentTask = results[0];

        const updatedTask = {
            title: title || currentTask.title,
            text: text || currentTask.text,
            boardId: boardId || currentTask.boardId,
        };

        db.query('UPDATE tasks SET title = ?, text = ?, boardId = ? WHERE id = ?', [updatedTask.title, updatedTask.text, updatedTask.boardId, taskId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating task - update task' });
            }

            sendDataToClients('update_task', { id: Number(taskId), title, text, boardId });

            res.json({ id: taskId });
        });
    });
};

export const deleteTask = (req: Request, res: Response) => {
    const { taskId } = req.params;

    const query = `
        DELETE
        FROM tasks
        WHERE id = ?;
    `;

    db.query(query, [taskId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ id: taskId });
    });
};

export const addUserToTask = (req: Request, res: Response) => {
    const { taskId, userName } = req.params;

    const query = `
        INSERT INTO task_users (taskId, userName)
        VALUES (?, ?);
    `;

    db.query(query, [taskId, userName], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        sendDataToClients('add_user_to_task', { taskId, userName });

        res.json({ taskId, userName });
    });
};

export const deleteUserFromTask = (req: Request, res: Response) => {
    const { taskId, userName } = req.params;

    const query = `
        DELETE
        FROM task_users
        WHERE taskId = ?
          AND userName = ?;
    `;

    db.query(query, [taskId, userName], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        sendDataToClients('delete_user_from_task', { taskId, userName })

        res.json({ taskId, userName });
    });
};

export const addLabelIdToTask = (req: Request, res: Response) => {
    const { taskId, labelId } = req.params;

    const query = `
        INSERT INTO task_labels (taskId, labelId)
        VALUES (?, ?);
    `;

    db.query(query, [taskId, labelId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ taskId, labelId });
    });
};

export const deleteLabelIdFromTask = (req: Request, res: Response) => {
    const { taskId, labelId } = req.params;

    const query = `
        DELETE
        FROM task_labels
        WHERE taskId = ?
          AND labelId = ?;
    `;

    db.query(query, [taskId, labelId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ taskId, labelId });
    });
};
