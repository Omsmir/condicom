import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import {
    getNotificationSchema,
    notificationSchema,
    updateNotificationSchema,
} from '../schemas/notifications.schema';
import {
    createNotificationHandler,
    getUserNotificationsHandler,
    sendEmailVerificationTest,
    updateNotificationSeenHandler,
} from '../controllers/notifications.controller';
import { Routes } from '@/interfaces/routes.interface';

class NotificationsRoutes implements Routes {
    public path = '/notifications';
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

        this.router.put(
            `${this.path}/update/:id`,
            upload.none(),
            validate(updateNotificationSchema),
            updateNotificationSeenHandler
        );

        this.router.post(`${this.path}/send`, sendEmailVerificationTest);
    }
}

export default NotificationsRoutes;
