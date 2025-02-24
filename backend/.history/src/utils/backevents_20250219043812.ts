import crypto from "crypto";
// import { Notifications } from "../db/schema/notification.js";
import { MedicalStuffRegex } from "./constants.js";

// Define types for users and notifications
interface User {
  _id: string;
  name: string;
  role: "Admin" | "Resident Doctor" | "Other";
  createdAt: Date;
}

interface NewUser {
  name: string;
}

interface Notification {
  type: string;
  description: string;
  title: string;
  assignedTo: string;
  eventId?: string;
}

// Function to get system notifications based on event type
export const systemNotifications = (
  title: "newUserHasJoined" | "emailVerification",
  user: User,
  newUser: NewUser
): Notification => {
  const systemNotification: Record<string, Notification> = {
    newUserHasJoined: {
      type: "New Member",
      description: `New Member (${newUser.name}) Has Joined Our Community`,
      title: "System Administration",
      assignedTo: "AdminOnly",
    },
    emailVerification: {
      type: "Email Verification",
      description: "Please Verify Your Email",
      title: "System Administration",
      assignedTo: "All",
      eventId: user._id,
    },
  };

  if (!systemNotification[title]) {
    throw new Error(`Invalid notification type: ${title}`);
  }

  return systemNotification[title];
};

export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

// export const getUserNotifications = async (user: User) => {
//   let notifications: Notification[] = [];

//   if (user.role === "Admin") {
//     notifications = await Notifications.find({
//       createdAt: { $gt: user.createdAt },
//       $or: [
//         { assignedTo: "All", eventId: user._id },
//         { assignedTo: "AdminOnly", user: { $ne: user._id } },
//         { assignedTo: "AdminsFromAll" },
//       ],
//     });
//   } else if (user.role === "Resident Doctor") {
//     notifications = await Notifications.find({
//       createdAt: { $gt: user.createdAt },
//       $or: [{ assignedTo: "All", eventId: user._id }],
//     });
//   }

//   return notifications;
// };

export const assignedNotifications = (user: User): string => {
  return user.role === "Admin" ? "AdminOnly" : "AdminsFromAll";
};
