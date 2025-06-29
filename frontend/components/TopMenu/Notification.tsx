"use client";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import clsx from "clsx";
import { Notification } from "@/types";
import {
  NotificationAssignedBy,
  NotificationDescription,
  notificationTime,
  NotificationType,
} from "../togglers/TopBarEvents";
import React from "react";
import { useSession } from "next-auth/react";
import { UseUpdateNotification } from "@/actions/mutation";
import { DashboardHook } from "../context/Dashboardprovider";

interface SingleNotificationProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const SingleNotification = ({
  notifications,
  setNotifications,
}: SingleNotificationProps) => {
  const { data: session } = useSession();
  const { api } = DashboardHook();

  const updateSeen = UseUpdateNotification(api, session?.user.id);

  const handleSeen = async (notificationId: string) => {
    await updateSeen.mutateAsync({ notificationId });
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === notificationId ? { ...n, seen: true } : n
      )
    );
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <h2 className="text-sm font-medium text-center text-slate-500">
          No notifications available
        </h2>
      </div>
    );
  }
  return notifications
    .map((notification: Notification, index: number) => (
      <DropdownMenuItem
        className="cursor-pointer hover:bg-slate-200  dark:hover:bg-[var(--sidebar-accent)]"
        key={index}
        onClick={() => handleSeen(notification._id)}
      >
        <div className="flex flex-1">
          <div className="flex justify-center items-center w-[20%]">
            <span className="flex content-center justify-center size-8 rounded-full border dark:bg-slate-50">
              {NotificationType(notification)}
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {!notification.seen && (
                  <span className="size-[6px] bg-green-500 rounded-full mr-1"></span>
                )}
                <h2 className={clsx("text-sm font-medium ")}>
                  {notification.title}
                </h2>
              </div>
              <p className="text-[12px] text-slate-500">
                {notificationTime(new Date(), notification.createdAt)}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="flex  text-[11px]">
                {NotificationAssignedBy(notification, session)}
                <span className="flex ">
                  {notification.assignedTo === "All" ? (
                    <>{notification.description}</>
                  ) : (
                    notification.description
                  )}
                </span>
              </h1>
              <NotificationDescription notification={notification} />
            </div>
          </div>
        </div>
      </DropdownMenuItem>
    ))
    .slice(-5)
    .sort()
    .reverse();
};

export default SingleNotification;
