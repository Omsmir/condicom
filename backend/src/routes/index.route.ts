import { Routes } from '@/interfaces/routes.interface';
import { Response, Request, Router, NextFunction } from 'express';

class IndexRoute implements Routes {
    public path = '/';
    public router = Router();

    constructor() {
        this.initializeIndexRoute();
    }
    private initializeIndexRoute() {
        this.router.get(this.path, async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.status(200).json({ message: 'server is responding' });
            } catch (error) {
                next(error);
            }
        });
    }
}

export default IndexRoute;
