"use client";
import { UseGetNotifications } from "@/actions/queries";
import { useSession } from "next-auth/react";
import React from "react";
import NotificationContent from "./NotificationContent";

const NotificationEncapsulating = () => {
  const { data: session } = useSession();

  const { data } = UseGetNotifications(session?.user.id);

  if (!data) return null; // Handle loading state or error appropriately


  return <NotificationContent fetchedNotifications={data.notifications} />;
};

export default NotificationEncapsulating;
