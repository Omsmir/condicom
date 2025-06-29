"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightOutlined, BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SocketInitiator } from "../togglers/TopBarEvents";
import { Notification, ObjectType } from "@/types";
import { DashboardHook } from "../context/Dashboardprovider";
import SingleNotification from "./Notification";

export const NotificationContent = ({
  fetchedNotifications,
}: {
  fetchedNotifications: Notification[];
}) => {
  const { data: session } = useSession();

  const [notifications, setNotifications] =
    useState<Notification[]>(fetchedNotifications);
  const { socket } = DashboardHook();

  const NotSeen = notifications.filter((notification) => !notification.seen);

  useEffect(() => {
    const role = session?.user.role;
    const initiator = async (
      NotificationTo: string,
      tone: keyof ObjectType
    ) => {
      try {
        await SocketInitiator(NotificationTo, tone, socket, setNotifications);
      } catch (error) {
        console.log(error);
      }
    };
    if (!role || !socket) return;

    if (role === "Admin") {
      initiator("adminNotification", "public");

      initiator(`Admin_${session.user.id}`, "system");

      if (!session.user.verified) {
        initiator(`EmailVerification${session.user.id}`, "system");
      }
    } else {
      if (!session.user.verified) {
        initiator(`EmailVerification${session.user.id}`, "system");
      }
    }

    // Cleanup listeners
    return () => {
      if (role === "Admin") {
        socket.off("adminNotification");
        socket.off(`Admin_${session.user.id}`);
        if (!session.user.verified) {
          socket.off(`EmailVerification${session.user.id}`);
        }
      } else {
        if (!session.user.verified) {
          socket.off(`EmailVerification${session.user.id}`);
        }
      }
    };
  }, [session?.user.role, socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev: Notification[]) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer mr-6">
          <Badge
            count={NotSeen?.length}
            size="small"
            offset={[0, 0]}
            color="blue"
            style={{ boxShadow: "none" }}
          >
            <div className="flex">
              <BellOutlined className="text-xl dark:text-slate-50" />
            </div>
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] sm:w-[480px] bg-[var(--sidebar-background)] p-0 border-0">
        <DropdownMenuLabel className="bg-slate-100 p-4 dark:bg-[var(--sidebar-background)]">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuLabel className="bg-slate-200 dark:bg-[var(--sidebar-accent)] px-4 font-medium text-slate-500">
          Today
        </DropdownMenuLabel>
        <SingleNotification
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Link href={"/dashboard/notifications"} className="flex">
          <DropdownMenuItem className="p-0 w-full cursor-pointer ">
            <div className="flex items-center justify-center w-full px-4 py-2 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[var(--sidebar-accent)]">
              View All Notifications
              <ArrowRightOutlined className="ml-2" />
            </div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationContent;
