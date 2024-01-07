import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const boardId = req.params.boardId;

    console.log('boardId', boardId);

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, data) => {
        // @ts-ignore I have no idea how to define the type for data
        if (data?.boardId !== boardId) {
            return res.status(401).json({ error: 'Unauthorized - Invalid boardId' });
        }
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        next();
    });
};
