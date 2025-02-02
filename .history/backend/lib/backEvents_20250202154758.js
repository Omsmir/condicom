import { Notifications
import { MedicalStuffRegex } from "./constants.js";
export const systemNotifications = (title, user, newUser) => {
  const systemNotification = {
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

  return systemNotification[`${title}`];
};

export const generateRandomToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

export const getUserNotifications = async (user) => {
  let notifications;
  switch (user.role) {
    case "Admin":
      notifications = await Notifications.find({
        createdAt: { $gt: user.createdAt },
        $or: [
          { assignedTo: "All", eventId: user._id },
          { assignedTo: "AdminOnly", user: { $ne: user._id } },
          { assignedTo: "AdminsFromAll" },
        ],
      });
      return notifications;
    case "Resident Doctor":
      notifications = await Notifications.find({
        createdAt: { $gt: user.createdAt },
        $or: [{ assignedTo: "All", eventId: user._id }],
      });
      return notifications;
    default:
      return notifications;
  }
};

export const assignedNotifications = (user) => {
  switch (user.role) {
    case "Admin":
      return "AdminOnly";
    default:
      return "AdminsFromAll";
  }
};

