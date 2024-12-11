"use client";

import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { isToday,differenceInHours } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardHook } from "../context/Dashboardprovider";
import { CalenderHook } from "../context/CalenderProvider";

export const NotificationContent = () => {
  const { open } = DashboardHook();
  const {currDate} = CalenderHook()



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer mr-6">
          <Badge count={1} size="small" offset={[0, 0]} color="blue">
            <div className="flex">
              <BellOutlined className="text-xl  dark:text-slate-50" />
            </div>
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-56 sm:w-80 bg-[var(--sidebar-background)] p-0 border-0">
        <DropdownMenuLabel className="bg-slate-100 p-4">Notifications</DropdownMenuLabel>
        <DropdownMenuLabel className="bg-slate-200 px-4 font-medium text-slate-500">{isToday(currDate) && "Today"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]">Status Bar</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-slate-200  dark:hover:bg-[var(--sidebar-background)]">Activity Bar</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-slate-200  dark:hover:bg-[var(--sidebar-background)]">Panel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotificationMenu = () => {
  return (
    <>
      <NotificationContent />
    </>
  );
};

export default NotificationMenu;
