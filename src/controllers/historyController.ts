import { Request, Response } from 'express';
import db from '../config/database';
import { sendDataToClients } from '../index';

export const getAllHistoryEntries = (req: Request, res: Response) => {
    db.query('SELECT * FROM history', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching history' });
        }

        res.json(results);
    });
};

export const createHistoryEntry = (req: Request, res: Response) => {
    const { description } = req.body;

    db.query('INSERT INTO history (description) VALUES (?)', [description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating history entry' });
        }

        const historyId = Number(results.insertId);

        db.query('SELECT * FROM history WHERE id = ?', [historyId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching history entry details' });
            }

            const createdEntry = result[0];

            sendDataToClients('create_history_entry', createdEntry);

            res.json(createdEntry);
        });
    });
};

export const updateHistoryEntry = (req: Request, res: Response) => {
    const historyId = Number(req.params.historyId);

    const { description } = req.body as { description: string };

    db.query('UPDATE history SET description = ? WHERE id = ?', [description, historyId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating history entry' });
        }

        sendDataToClients('update_history_entry', { id: historyId, description });

        res.status(204).json();
    });
};
