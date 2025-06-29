import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import {
    NotificationDocument,
    NotificationInput,
    NotificationModel,
} from '../models/notifications.model';

export const createNotification = async (input: NotificationInput) => {
    return await NotificationModel.create(input);
};

export const getUserNotifications = async (query: FilterQuery<NotificationDocument>) => {
    return await NotificationModel.find({ query });
};

export const getNotification = async (query: FilterQuery<NotificationDocument>) => {
    return await NotificationModel.findOne(query);
};

export const updateNotification = async (
    query: FilterQuery<NotificationDocument>,
    update: UpdateQuery<NotificationDocument>,
    options?: QueryOptions
) => {
    return await NotificationModel.findOneAndUpdate(query, update, options);
};
