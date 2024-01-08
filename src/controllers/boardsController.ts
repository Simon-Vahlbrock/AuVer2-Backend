import { Request, Response } from 'express';
import db from '../config/database';
import { sendDataToClients } from '../index';

export const getAllBoards = (req: Request, res: Response) => {
    db.query('SELECT * FROM boards', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching boards' });
        }

        res.json({ boards: results });
    });
};

export const createBoard = (req: Request, res: Response) => {
    const { name } = req.body;

    db.query('INSERT INTO boards (name) VALUES (?)', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating board' });
        }

        const boardId = results.insertId;
        res.json({ id: boardId });
    });
};

export const updateBoard = (req: Request, res: Response) => {
    const { boardId } = req.params;

    const { name } = req.body as { name: string };

    db.query('UPDATE boards SET name = ? WHERE id = ?', [name, boardId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating board' });
        }

        sendDataToClients('update_board', { id: Number(boardId), name });

        res.json({});
    });
};

export const deleteBoard = (req: Request, res: Response) => {
    const { boardId } = req.params;

    db.query('DELETE FROM boards WHERE id = ?', [boardId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting board' });
        }

        res.json({});
    });
};
