import { Request, Response } from "express";
import { notificationSchemaInterface } from "../schemas/notifications.schema";
import { findUser } from "../services/user.service";

export const createNotificationHandler = async (req:Request<{},{},notificationSchemaInterface['body']>,res:Response) => {
    try {
        const existingUser = await findUser()
    } catch (error) {
        
    }
}