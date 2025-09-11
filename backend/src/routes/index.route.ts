import { Response, Request, Router, NextFunction } from 'express';
import { BaseRoute } from './base.route';

class IndexRoute extends BaseRoute {
    constructor() {
        super('/');
        this.initializeRoutes();
    }
    protected initializeRoutes() {
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
