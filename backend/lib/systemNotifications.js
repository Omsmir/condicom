export const systemNotifications = (title,user,newUser) => {
  const systemNotification = {
    newUserHasJoined: {
      type: "New Member",
      description: `New Member (${newUser.name}) Has Joined Our Community`,
      title: "System Administration",
      assignedTo: "Admin",
    },
    emailVerification: {
      type: "Email Verification",
      description: "Please Verify Your Email",
      title: "System Administration",
      assignedTo: "All",
      eventId:user._id
    },
  };

  return systemNotification[`${title}`];
};

