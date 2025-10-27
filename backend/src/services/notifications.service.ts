import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import {
    NotificationDocument,
    NotificationInput,
    NotificationModel,
} from '../models/notifications.model';
import { UserDocument } from '@/models/user.model';
import { Notification } from '@/interfaces/global.interface';

class NotificationService {
    constructor(private notificationModel = NotificationModel) {}

    public createNotification = async (input: NotificationInput) => {
        return await this.notificationModel.create(input);
    };

    public getNotification = async (query: FilterQuery<NotificationDocument>) => {
        return await this.notificationModel.findOne(query);
    };

    public updateNotification = async (
        query: FilterQuery<NotificationDocument>,
        update: UpdateQuery<NotificationDocument>,
        options?: QueryOptions
    ) => {
        return await this.notificationModel.findOneAndUpdate(query, update, options);
    };

    public getUserNotifications = async (user: UserDocument) => {
        let notifications: Notification[] = [];

        if (user.role === 'Admin') {
            notifications = await this.notificationModel.find({
                createdAt: { $gt: user.createdAt },
                $or: [
                    { assignedTo: 'All', eventId: user._id },
                    { assignedTo: 'AdminOnly', user: { $ne: user._id } },
                    { assignedTo: 'AdminsFromAll' },
                ],
            });
        } else {
            notifications = await this.notificationModel.find({
                createdAt: { $gt: user.createdAt },
                $or: [{ assignedTo: 'All', eventId: user._id }],
            });
        }

        return notifications;
    };

    public deleteMultipleNotifications = async (input: string[]) => {
        return await this.notificationModel.deleteMany({ _id: { $in: input } });
    };

    // Function to get system notifications based on event type
    public systemNotifications = (
        title: 'newUserHasJoined' | 'emailVerification',
        user: UserDocument
    ): Notification => {
        const systemNotification: Record<string, Notification> = {
            newUserHasJoined: {
                type: 'New Member',
                description: `New Member (${user.name}) Has Joined Our Community`,
                title: 'System Administration',
                assignedTo: 'AdminOnly',
            },
            emailVerification: {
                type: 'Email Verification',
                description: 'A verification link has sent to your email please verify your email',
                title: 'System Administration',
                assignedTo: 'All',
                eventId: user._id as string,
            },
        };

        if (!systemNotification[title]) {
            throw new Error(`Invalid notification type: ${title}`);
        }

        return systemNotification[title];
    };
}

export default NotificationService;
