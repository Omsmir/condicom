import { FilterQuery } from "mongoose";
import { NotificationDocument, NotificationInput, NotificationModel } from "../models/notifications.model";

export const createNotification = async (input: NotificationInput) => {
    return await NotificationModel.create(input)
}




export const getUserNotifications =async (query:FilterQuery<NotificationDocument>) => {
    return await NotificationModel.find({query})
}