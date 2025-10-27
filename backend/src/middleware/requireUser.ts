import { NextFunction, Request, Response } from 'express';

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
        res.status(403).json({ message: 'please login' });
        return;
    }

    next();
};
