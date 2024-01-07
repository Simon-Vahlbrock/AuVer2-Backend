import express from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({ error: 'Unauthorized - Token has expired' });
            } else {
                return res.status(401).json({ error: 'Unauthorized - Invalid token' });
            }
        }
        next();
    });
};
