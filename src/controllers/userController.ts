import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';

const secretKey = 'your-secret-key';

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error registering user' });
            }
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        }
    );
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
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

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
};
