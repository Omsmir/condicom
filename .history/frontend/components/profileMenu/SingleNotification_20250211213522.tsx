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
import { format } from "date-fns";
import React from "react";
import { useSession } from "next-auth/react";

const SingleNotification = ({
  notifications,
}: {
  notifications: Notification[] | undefined;
}) => {
  const { data: session } = useSession();
  return notifications && notifications
    .map((notification: Notification, index: number) => (
      <DropdownMenuItem
        className="cursor-pointer hover:bg-slate-200  dark:hover:bg-[var(--sidebar-accent)]"
        key={index}
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
                <span className="size-[6px] bg-green-500 rounded-full mr-1"></span>
                <h2 className={clsx("text-sm font-medium ")}>
                  {notification.title}
                </h2>
              </div>
              <p className="text-[12px] text-slate-500">
                {notificationTime(new Date(), notification.updatedAt)}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="flex  text-[11px]">
                {NotificationAssignedBy(notification,session)}
                <span className="flex ">
                  {notification.assignedTo === "All" ? (
                    <>
                      {notification.description}
                    </>
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
