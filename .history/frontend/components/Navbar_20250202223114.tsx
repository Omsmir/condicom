"use client";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import clsx from "clsx";
import BadgeAvatar from "./profileMenu/Avatar";
import NotificationContent from "./profileMenu/NotificationContent";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const { open, isMobile } = useSidebar();
  const { data: session } = useSession();
  return (
    <nav className="fixed w-full h-14 bg-[var(--sidebar-background)] z-20 border-b dark:border-slate-700">
      <div
        className={clsx(
          " flex flex-row items-center justify-between h-full py-2 pl-14 transition-all pr-8 overflow-hidden",
          { "pl-14 md:pl-[220px]": open },{"pl-8":isMobile}
        )}
      >
        <div className="flex flex-1">
          {isMobile && <SidebarTrigger />}
          <div className="flex flex-col ">
            <h1 className="text-sm font-medium capitalize hidden sm:block">
              Good Morning, {session?.user.role} {session?.user.name}!
            </h1>
            <p className="text-[12px] text-slate-500 capitalize hidden sm:block">
              i hope you're in a good mood because there're 52 tasks
            </p>
          </div>
         
        </div>

        <div className="flex items-center">
          <NotificationContent />
          <BadgeAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
