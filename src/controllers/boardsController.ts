import { Request, Response } from 'express';
import db from '../config/database';
import { sendDataToClients } from '../index';

export const getAllBoards = (req: Request, res: Response) => {
    db.query('SELECT * FROM boards', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching boards' });
        }

        res.json(results);
    });
};

export const createBoard = (req: Request, res: Response) => {
    const { name } = req.body;

    db.query('INSERT INTO boards (name) VALUES (?)', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating board' });
        }

        const boardId = Number(results.insertId);

        sendDataToClients('add_board', { id: boardId, name });

        res.json({ id: boardId });
    });
};

export const updateBoard = (req: Request, res: Response) => {
    const boardId = Number(req.params.boardId);

    const { name } = req.body as { name: string };

    db.query('UPDATE boards SET name = ? WHERE id = ?', [name, boardId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating board' });
        }

        sendDataToClients('update_board', { id: boardId, name });

        res.status(204).json();
    });
};

export const deleteBoard = (req: Request, res: Response) => {
    const boardId = Number(req.params.boardId);

    db.query('DELETE FROM boards WHERE id = ?', [boardId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting board' });
        }

        sendDataToClients('delete_board', { id: boardId });

        res.status(204).json();
    });
};
