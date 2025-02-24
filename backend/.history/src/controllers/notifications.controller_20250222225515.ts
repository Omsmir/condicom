import { Request, Response } from "express";
import { notificationSchemaInterface } from "../schemas/notifications.schema";
import { findUser } from "../services/user.service";
import UserModel from "../models/user.model";
import mongoose from "mongoose";
import { createNotification } from "../services/notifications.service";

export const createNotificationHandler = async (req:Request<{},{},notificationSchemaInterface['body']>,res:Response) => {
    try {
        const id = req.body.user

        const admins = await UserModel.find({role:"Admin",_id: {$ne:new mongoose.Types.ObjectId(id)}})



        const notification = await createNotification({ass})
    } catch (error) {
        
    }
}