import { Request, Response } from 'express';
import {
    GetnotificationSchemaInterface,
    notificationSchemaInterface,
} from '../schemas/notifications.schema';
import { findUser } from '../services/user.service';
import UserModel from '../models/user.model';
import mongoose from 'mongoose';
import { createNotification } from '../services/notifications.service';
import { assignedNotifications, getUserNotifications } from '../utils/backevents';
import App from '@/app';

export const createNotificationHandler = async (
    req: Request<{}, {}, notificationSchemaInterface['body']>,
    res: Response
) => {
    try {
        const id = req.body.user;
        const currentUser = await findUser({ _id: id });
        const initiator = App.initiator;

        if (!currentUser) {
            res.status(404).json({ message: 'forbidden' });
            return;
        }
        const admins = await UserModel.find({
            role: 'Admin',
            _id: { $ne: new mongoose.Types.ObjectId(id) },
        });

        const notification = await createNotification({
            ...req.body,
            user: id,
            assignedTo: assignedNotifications(currentUser),
        });

        if (currentUser.role === 'Admin') {
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
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserNotificationsHandler = async (
    req: Request<GetnotificationSchemaInterface['params']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const currentUser = await findUser({ _id: id });
        if (!currentUser) {
            res.status(404).json({ message: "user doesn't exist" });
            return;
        }

        const notifications = await getUserNotifications(currentUser);

        res.status(200).json({ notifications });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
