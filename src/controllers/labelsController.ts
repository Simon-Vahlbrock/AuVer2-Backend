import { Request, Response } from 'express';
import db from '../config/database';
import { sendDataToClients } from '../index';

export const getAllLabels = (req: Request, res: Response) => {
    db.query('SELECT * FROM labels', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching labels' });
        }

        res.json(results);
    });
};

export const createLabel = (req: Request, res: Response) => {
    const { name, color } = req.body;

    db.query('INSERT INTO labels (name, color) VALUES (?, ?)', [name, color], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating label' });
        }

        const labelId = Number(results.insertId);

        sendDataToClients('add_label', { id: labelId, name, color });

        res.json({ id: labelId });
    });
};

export const updateLabel = (req: Request, res: Response) => {
    const labelId = Number(req.params.id);
    const { name, color } = req.body;

    db.query('SELECT * FROM labels WHERE id = ?', [labelId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating label - get current label' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Label not found' });
        }

        const currentLabel = results[0];

        const updatedLabel = {
            name: name || currentLabel.name,
            color: color || currentLabel.color,
        };

        db.query('UPDATE labels SET name = ?, color = ? WHERE id = ?', [updatedLabel.name, updatedLabel.color, labelId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating label - update label' });
            }

            sendDataToClients('update_label', { id: labelId, name, color });

            res.status(204).json();
        });
    });
};
