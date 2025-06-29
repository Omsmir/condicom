import { Request, Response } from 'express';
import {
    GetnotificationSchemaInterface,
    notificationSchemaInterface,
    updateNotificationSchemaInterface,
} from '../schemas/notifications.schema';
import { findUser, getAllUsers } from '../services/user.service';
import UserModel from '../models/user.model';
import mongoose from 'mongoose';
import {
    createNotification,
    getNotification,
    updateNotification,
} from '../services/notifications.service';
import {
    assignedNotifications,
    getUserNotifications,
    sendEmail,
    systemNotifications,
} from '../utils/backevents';
import App from '@/app';
import { createHash } from '@/utils/redis';
import { DFTOKENTTL } from '@/config';

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

export const updateNotificationSeenHandler = async (
    req: Request<
        updateNotificationSchemaInterface['params'],
        {},
        updateNotificationSchemaInterface['body']
    >,
    res: Response
) => {
    try {
        const id = req.params.id;
        const seen = req.body.seen;
        const notificationId = req.body.notificationId;

        const currentUser = await findUser({ _id: id });
        if (!currentUser) {
            res.status(404).json({ message: "user doesn't exist" });
            return;
        }

        console.log(notificationId, seen);
        const existingNotification = await getNotification({ _id: notificationId });

        const notification = await getNotification({ _id: notificationId, seen: true });

        if (notification) {
            res.status(404).json({ message: 'notification not found or already seen' });
            return;
        }

        if (!existingNotification) {
            res.status(404).json({ message: 'notification not found' });
            return;
        }
        await updateNotification(
            { _id: notificationId },
            { seen },
            { runValidators: true, new: true }
        );

        res.status(200).json({ message: 'notification updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
// test handler only for sending email verification to all unverified users
// This should be run manually or scheduled using a cron job
// It is not recommended to use this in production without proper checks

export const sendEmailVerificationTest = async (req: Request, res: Response) => {
    try {
        const unVerifiedUsers = await getAllUsers({ verified: false });
        const initiator = App.initiator;

        if (!unVerifiedUsers || unVerifiedUsers.length < 1) {
            res.status(404).json({ message: 'no unverified users found' });
            return;
        }

        unVerifiedUsers.map(async user => {
            const notification = systemNotifications('emailVerification', user);

            const createdNotification = await createNotification({
                ...notification,
                user: user._id,
                assignedBy: 'system',
            });

            if (!createdNotification) {
                res.status(404).json({ message: 'error creating a notification' });
                return;
            }

            initiator.emit(`EmailVerification${user._id}`, createdNotification);

            await sendEmail({
                to: user.email,
                health: 'health',
                year: new Date().getFullYear(),
                templateName: 'emailVerificationAlert.hbs',
            });
            const HashName = `emailVerificationAlert:${user._id}`;

            await createHash({
                HashName,
                content: { lastemail: new Date().toISOString() },
                expire: parseInt(DFTOKENTTL as string) * 24.5,
            });
        });
        res.status(200).json({ message: 'Alert messages sent successfully ' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
