import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import { SECRET_KEY } from '../config/jwt';

export const registerUser = async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const { userName, password } = req.body;

    db.query('SELECT * FROM users WHERE userName = ? AND boardId = ?', [userName, boardId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error registering user' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (userName, password, boardId) VALUES (?, ?, ?)',
        [userName, hashedPassword, boardId],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error registering user' });
            }
            const token = jwt.sign({ userName, boardId }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        }
    );
};

export const loginUser = async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const { userName, password } = req.body;

    db.query('SELECT * FROM users WHERE userName = ? AND boardId = ?', [userName, boardId], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging in' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userName, boardId }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
};

export const getAllUsernames = (req: Request, res: Response) => {
    const boardId = req.params.boardId;

    db.query('SELECT userName FROM users WHERE boardId = ?',[boardId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching usernames' });
        }

        const userNames = results.map((user: { userName: string }) => user.userName);
        res.json({ userNames });
    });
};
