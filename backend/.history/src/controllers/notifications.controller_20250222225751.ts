import { Request, Response } from "express";
import { notificationSchemaInterface } from "../schemas/notifications.schema";
import { findUser } from "../services/user.service";
import UserModel from "../models/user.model";
import mongoose from "mongoose";
import { createNotification } from "../services/notifications.service";
import { assignedNotifications } from "../utils/backevents";
import { initiator } from "../server";

export const createNotificationHandler = async (
  req: Request<{}, {}, notificationSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.body.user;
    const currentUser = await findUser({ _id: id });

    const admins = await UserModel.find({
      role: "Admin",
      _id: { $ne: new mongoose.Types.ObjectId(id) },
    });

    const notification = await createNotification({
      ...req.body,
      user: id,
      assignedTo: assignedNotifications(currentUser),
    });



    if (currentUser.role === "Admin") {
        admins.map((admin) => {
          initiator.emit(`Admin_${admin._id}`, notification);
        });
      } else {
        initi.emit("adminNotification", notification);
      }
  } catch (error) {}
};
