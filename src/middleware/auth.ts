import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        next();
    });
};
