"use client";
import ThemeToggle from "./togglers/ToggleTheme";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import LogoutButton from "./togglers/LogoutButton";
import clsx from "clsx";
import BadgeAvatar from "./ProfileMenu/Avatar";
import NotificationMenu from "./ProfileMenu/NotificationMenu";
const Navbar = () => {
  const { open,isMobile } = useSidebar();
  return (
    <nav className="fixed w-full h-14 dark:bg-[var(--sidebar-background)] bg-slate-50 z-10 navbar">
      <div
        className={clsx(
          " flex flex-row items-center justify-between h-full py-2 pl-14 transition-all pr-10",{"pl-14 md:pl-64":open}
        )}
      >
      <div className="flex">
      {isMobile && <SidebarTrigger />}
      </div>

        <div className="flex items-center">
          <NotificationMenu />
          <BadgeAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
