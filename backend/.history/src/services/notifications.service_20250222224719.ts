import { NotificationInput, NotificationModel } from "../models/notifications.model";

export const createNotification = async (input: NotificationInput) => {
    return await NotificationModel.create(input)
}




export const get