import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import {
    getNotificationSchema,
    notificationSchema,
    updateNotificationSchema,
} from '../schemas/notifications.schema';

import { Routes } from '@/interfaces/routes.interface';
import NotificationController from '@/controllers/notifications.controller';

class NotificationsRoutes implements Routes {
    public path = '/notifications';
    public router = Router();

    constructor(private notificationController: NotificationController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.none(),
            validate(notificationSchema),
            this.notificationController.createNotificationHandler
        );

        this.router.get(
            `${this.path}/:id`,
            validate(getNotificationSchema),
            this.notificationController.getUserNotificationsHandler
        );

        this.router.put(
            `${this.path}/update/:id`,
            upload.none(),
            validate(updateNotificationSchema),
            this.notificationController.updateNotificationSeenHandler
        );

        this.router.post(`${this.path}/send`, this.notificationController.sendEmailVerificationTest);
    }
}

export default NotificationsRoutes;
