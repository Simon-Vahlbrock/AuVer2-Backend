import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import { REFRESH_TOKEN_SECRET, TOKEN_SECRET } from '../config/jwt';

export const registerUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    db.query('SELECT * FROM users WHERE userName = ?', [userName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error registering user - get current user' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (userName, password) VALUES (?, ?)',
        [userName, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error registering user - creating user' });
            }

            const token = jwt.sign({ userName }, TOKEN_SECRET, { expiresIn: '1h' });

            const refreshToken = jwt.sign({ userName, isRefreshToken: true }, REFRESH_TOKEN_SECRET, { expiresIn: '90d' });

            res.json({ token, refreshToken });
        }
    );
};

export const loginUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    db.query('SELECT * FROM users WHERE userName = ?', [userName], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging in' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0] as { userName: string, password: string };

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userName }, TOKEN_SECRET, { expiresIn: '1h' });

        const refreshToken = jwt.sign({ userName, isRefreshToken: true }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.json({ token, refreshToken, userName: user.userName });
    });
};

export const getAllUsers = (req: Request, res: Response) => {
    db.query('SELECT userName FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching usernames' });
        }

        const userNames = results.map((user: { userName: string }) => user.userName);
        res.json({ userNames });
    });
};

export const refreshTokens = (req: Request, res: Response) => {
    const { refreshToken } = req.body as { refreshToken: string };

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid refresh token' });
        }

        // @ts-ignore
        const token = jwt.sign({ userName: data.userName }, TOKEN_SECRET, { expiresIn: '1h' });

        // @ts-ignore
        const refreshToken = jwt.sign({ userName: data.userName, isRefreshToken: true }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.json({ token, refreshToken });
    });
}
