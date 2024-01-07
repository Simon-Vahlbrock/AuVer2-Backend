import express, { NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET, TOKEN_SECRET } from '../config/jwt';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, TOKEN_SECRET, (err, data) => {
        // @ts-ignore I don't know, how to set a type for this
        if (data?.isRefreshToken) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

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
