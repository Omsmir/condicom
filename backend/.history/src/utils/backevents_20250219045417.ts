import crypto from "crypto";
// import { Notifications } from "../db/schema/notification.js";
import { MedicalStuffRegex } from "./constants";
import userdoc


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
  user: UserDocument,
  newUser: UserDocument
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
      eventId: user._id as string,
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

export const assignedNotifications = (user: UserDocument): string => {
  return user.role === "Admin" ? "AdminOnly" : "AdminsFromAll";
};




interface codeProps {
    numbers: number[],
    fiveNumbers: number[],
    characters: string[]
}

export const generateCode = ({numbers,fiveNumbers,characters}:codeProps) => {
    let code;
    const firstLetter = "B";

    const lastFiveNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    code = firstLetter + numbers[Math.floor(Math.random() * numbers.length)];

    code += fiveNumbers[Math.floor(Math.random() * fiveNumbers.length)];

    code += characters[Math.floor(Math.random() * characters.length)];

    for (let i = 5; i < lastFiveNumbers.length; i++) {
      code +=
        lastFiveNumbers[Math.floor(Math.random() * lastFiveNumbers.length)];
    }
    return code;
  };



  export const signRole = (code:string) => {
    let role;

    MedicalStuffRegex.map((prefix) => {
        if(prefix.regex.test(code)){
            role = prefix.role
        }
    })

    return role
  }



