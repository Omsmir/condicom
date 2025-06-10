import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import { getNotificationSchema, notificationSchema } from '../schemas/notifications.schema';
import {
    createNotificationHandler,
    getUserNotificationsHandler,
} from '../controllers/notifications.controller';
import { Routes } from '@/interfaces/routes.interface';

class NotificationsRoutes implements Routes {
    public path = '/notificatilons';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.none(),
            validate(notificationSchema),
            createNotificationHandler
        );

        this.router.get(
            `${this.path}/:id`,
            validate(getNotificationSchema),
            getUserNotificationsHandler
        );
    }
}

export default NotificationsRoutes;
