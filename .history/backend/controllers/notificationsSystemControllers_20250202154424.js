import { Notifications } from "../db/schema/notification.js";
import { User } from "../db/schema/user.js";
import { systemNotifications } from "../lib/systemNotifications.js";
import { io } from "../server.js";
import cron from "node-cron";

export const getAllNotifications = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "There is No ExistingUser" });
    }

    if (user.role !== "Admin") {
      let notifications;
      if (!user.verified) {
        notifications = await Notifications.find({
          $or: [
            {
              assignedTo: "All",
              eventId: user._id,
              createdAt: { $gt: user.createdAt },
            },
          ],
        });
      } else {
        notifications = await Notifications.find({
          $or: [
            {
              assignedTo: "Admins",
              createdAt: { $gt: user.createdAt },
            },
          ],
        });
      }
      return res.status(200).json({ notifications });
    }

    if (user.role === "Admin") {
      let notifications;
      if (!user.verified) {
        notifications = await Notifications.find({
          createdAt: { $gt: user.createdAt },
          $or: [
            { eventId: user._id, assignedTo: "All" }, // System Notification
            { assignedTo: "Admin", user: { $ne: user._id } },
            { assignedTo: "Admins" },
          ],
        });
      } else {
        notifications = await Notifications.find({
          createdAt: { $gt: user.createdAt },
          $or: [
            { eventId: user._id, assignedTo: "All" },
            { assignedTo: "Admin", user: { $ne: user._id }},
            { assignedTo: "Admins" },
          ],
        });
      }
      return res.status(200).json({ notifications });
    }
  } catch (error) {
    return next(error);
  }
};

export const systemAutomaticNotifications = async () => {
  try {
    const unVerfiedUsers = await User.find({ verified: false });

    let systemNotification;
    unVerfiedUsers.map(async (user) => {
      const AdminNotification = {
        type: "Email Verification",
        description: "Please Verify Your Email",
        title: "System Administration",
        assignedTo: "All",
        eventId: user._id,
      };
      systemNotification = new Notifications(AdminNotification);

      await systemNotification.save();

      io.emit(`EmailVerification${user._id}`, systemNotification);
    });

    console.log("System notification sent successfully:", systemNotification);
  } catch (error) {
    console.error(error.message);
  }
};

cron.schedule("0 0 */7 * *", systemAutomaticNotifications); // every hour

export const SystemNotifications = async (req, res, next) => {
  const { notification ,user} = req.body;
  try {
    const AdminUsers = await User.find({ role: "Admin"  });

    console.log(AdminUsers)
    if (!notification || ! user) {
      return res.status(404).json({ message: "Support a Notification" });
    }

    let systemNotification;

    const newNotification = systemNotifications(notification, "",user);

    systemNotification = new Notifications(newNotification);

    await systemNotification.save();

    AdminUsers.map(async (admin) => {
      io.emit(`Admin_${admin._id}`, systemNotification);
    });

    return res.status(201).json({ message: "success", systemNotification });
  } catch (error) {
    return next(error);
  }
};

export const CreateNotification = async (req, res, next) => {
  const { type, description, title, user, assignedBy, eventId } = req.body;

  try {
    const ExistingUser = await User.findById(user);
    const AllAdminUsers = await User.find({ role: "Admin" });
    const filteredAdmins = AllAdminUsers.filter(
      (user) => user.email !== ExistingUser.email
    );

    const RequiredData = {
      type,
      description,
      title,
      user,
      assignedBy,
    };
    for (const [key, value] of Object.entries(RequiredData)) {
      if (!value) {
        return res.status(400).json({ msg: `Missing ${key}` });
      }
    }

    const newNotification = new Notifications({
      type,
      description,
      title,
      user,
      assignedTo: assignedNotifications(ExistingUser),
      eventId,
      assignedBy,
    });
    await newNotification.save();

    if (ExistingUser.role === "Admin") {
      filteredAdmins.map((admin) => {
        io.emit(`Admin_${admin._id}`, newNotification);
      });
    } else {
      io.emit("adminNotification", newNotification);
    }

    return res.status(201).json({
      msg: "Notification saved successfully",
      notifications: newNotification,
    });
  } catch (error) {
    return next(error);
  }
};

export const GetNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userNotifications = await Notifications.find({ user: id });

    if (!userNotifications) {
      return res.status(404).json({ msg: "User Notifications not found" });
    }

    return res.status(200).json({ notifications: userNotifications });
  } catch (error) {
    return next(error);
  }
};

export const UpdateNotification = async (req, res, next) => {
  const { seen } = req.body;
  const { id } = req.params;
  try {
    const ExistingNotification = await Notifications.find({ user: id });

    if (!ExistingNotification) {
      return res.status(404).json({ msg: "Notification not found" });
    }
    if (!isNew) {
      return res.status(400).json({ msg: "Missing state field" });
    }

    ExistingNotification.seen = seen;
    await ExistingNotification.save();

    return res.status(200).json({
      msg: "Notification updated successfully",
      notification: ExistingNotification,
    });
  } catch (error) {
    return next(error);
  }
};

