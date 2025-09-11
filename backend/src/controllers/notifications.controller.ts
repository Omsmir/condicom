import { Request, Response } from 'express';
import {
    GetnotificationSchemaInterface,
    notificationSchemaInterface,
    updateNotificationSchemaInterface,
} from '../schemas/notifications.schema';
import UserService from '../services/user.service';
import mongoose from 'mongoose';
import NotificationService from '../services/notifications.service';
import { assignedNotifications } from '../utils/backevents';
import App from '@/app';
import { DFTOKENTTL } from '@/config';
import { BaseController } from './base.controller';
import HttpException from '@/exceptions/httpException';
import { RedisConnection, RedisServices } from '@/utils/redis';
import { EmailSubjects, Invoker, SendEmail } from '@/utils/emailUtils';

class NotificationController extends BaseController {
    private notificationService: NotificationService;
    private userService: UserService;
    private redisService: RedisServices;
    private invoker: Invoker;
    constructor() {
        super();
        this.notificationService = new NotificationService();
        this.userService = new UserService();
        this.redisService = new RedisServices(RedisConnection.getInstance().getClient());
        this.invoker = new Invoker();
    }

    public createNotificationHandler = async (
        req: Request<{}, {}, notificationSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.body.user;
            const existingUser = await this.userService.findUser({ _id: id });
            const initiator = App.initiator;

            if (!existingUser) {
                throw new HttpException(404, "User doesn't exist");
            }
            const admins = await this.userService.getAllUsers({
                role: 'Admin',
                _id: { $ne: new mongoose.Types.ObjectId(id) },
            });

            const notification = await this.notificationService.createNotification({
                ...req.body,
                user: id,
                assignedTo: assignedNotifications(existingUser),
            });

            if (existingUser.role === 'Admin') {
                admins.map(admin => {
                    initiator.emit(`Admin_${admin._id}`, notification);
                });
            } else {
                initiator.emit('adminNotification', notification);
            }

            res.status(201).json({
                message: 'notification created successfully',
                notifications: notification,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getUserNotificationsHandler = async (
        req: Request<GetnotificationSchemaInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(404, "User doesn't exist");
            }

            const notifications = await this.notificationService.getUserNotifications(existingUser);

            res.status(200).json({ notifications });
        } catch (error: any) {
            this.handleError(res, error);
        }
    };

    public updateNotificationSeenHandler = async (
        req: Request<
            updateNotificationSchemaInterface['params'],
            {},
            updateNotificationSchemaInterface['body']
        >,
        res: Response
    ) => {
        try {
            const seen = req.body.seen;
            const notificationId = req.body.notificationId;

            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(404, "User doesn't exist");
            }

            const existingNotification = await this.notificationService.getNotification({
                _id: notificationId,
            });

            const notification = await this.notificationService.getNotification({
                _id: notificationId,
                seen: true,
            });

            if (notification) return;

            if (!existingNotification) {
                throw new HttpException(404, 'Notification not found');
            }
            await this.notificationService.updateNotification(
                { _id: notificationId },
                { seen },
                { runValidators: true, new: true }
            );

            res.status(200).json({ message: 'notification updated successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    // test handler only for sending email verification to all unverified users
    // This should be run manually or scheduled using a cron job
    // It is not recommended to use this in production without proper checks

    public sendEmailVerificationTest = async (req: Request, res: Response) => {
        try {
            const unVerifiedUsers = await this.userService.getAllUsers({ verified: false });
            console.log(unVerifiedUsers);
            const initiator = App.initiator;

            if (!unVerifiedUsers || unVerifiedUsers.length < 1) {
                throw new HttpException(404, 'no unverified users found');
            }

            for (const user of unVerifiedUsers) {
                const notification = this.notificationService.systemNotifications(
                    'emailVerification',
                    user
                );

                const createdNotification = await this.notificationService.createNotification({
                    ...notification,
                    user: user._id,
                    assignedBy: 'system',
                });

                if (!createdNotification) {
                    throw new HttpException(400, 'error creating a notification');
                }

                initiator.emit(`EmailVerification${user._id}`, createdNotification);

                this.invoker.add_invoker(
                    new SendEmail({
                        to: user.email,
                        health: 'health',
                        year: new Date().getFullYear(),
                        templateName: 'emailVerificationAlert.hbs',
                        subject: EmailSubjects.EMAIL_VERIFICATION_ALERT,
                    })
                );
                const HashName = `emailVerificationAlert:${user._id}`;

                await this.redisService.createHash({
                    HashName,
                    content: { lastemail: new Date().toISOString() },
                    expire: parseInt(DFTOKENTTL as string) * 24.5,
                });
            }

            this.invoker.run();

            res.status(200).json({ message: 'Alert messages sent successfully ' });
        } catch (error) {
            this.handleError(res, error);
        }
    };
}

export default NotificationController;
