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
import SingleNotification from "./SingleNotification";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SocketInitiator } from "../togglers/TopBarEvents";
import { Notification, ObjectType } from "@/types";
import { DashboardHook } from "../context/Dashboardprovider";
import { useGetUserNotifications } from "@/actions/queries";

export const NotificationContent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = DashboardHook();

  const { data: session } = useSession();

  const {data,refetch} = useGetUserNotifications(session?.user.id)

 omst query
  useEffect(() => {
    const role = session?.user.role;
    const initiator = async (
      NotificationTo: string,
      tone: keyof ObjectType
    ) => {
      try {
        await SocketInitiator(NotificationTo, tone, socket);
      } catch (error) {
        console.log(error);
      }
    };
    if (!role || !socket) return;

    if (role === "Admin") {
      initiator("adminNotification", "adminOnly");


      initiator(`Admin_${session.user.id}`, "public");

      if (!session.user.verified) {
        initiator(`EmailVerification${session.user.id}`, "public");
      }
    } else {
      if (!session.user.verified) {
        initiator(`EmailVerification${session.user.id}`, "public");
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
  }, [session?.user?.role, socket]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNotifications((prev: Notification[]) => [...prev]);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="custom">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer mr-6">
            <Badge
              count={data?.notifications.length}
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
        <DropdownMenuContent className="w-96 bg-[var(--sidebar-background)] p-0 border-0">
          <DropdownMenuLabel className="bg-slate-100 p-4 dark:bg-[var(--sidebar-background)]">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuLabel className="bg-slate-200 dark:bg-[var(--sidebar-accent)] px-4 font-medium text-slate-500">
            Today
          </DropdownMenuLabel>
          <SingleNotification notifications={data?.notifications} />
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
    </div>
  );
};

export default NotificationContent;
