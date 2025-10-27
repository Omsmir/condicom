import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import {
    getNotificationSchema,
    notificationSchema,
    updateNotificationSchema,
} from '../schemas/notifications.schema';

import NotificationController from '@/controllers/notifications.controller';
import { BaseRoute } from './base.route';

class NotificationsRoutes extends BaseRoute {
    constructor(private notificationController: NotificationController) {
        super('/notifications');
        this.initializeRoutes();
    }

    protected initializeRoutes() {
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

        this.router.post(
            `${this.path}/send`,
            this.notificationController.sendEmailVerificationTest
        );
    }
}

export default NotificationsRoutes;
