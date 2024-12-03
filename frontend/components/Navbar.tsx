"use client";
import ThemeToggle from "./togglers/ToggleTheme";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import LogoutButton from "./togglers/LogoutButton";
import clsx from "clsx";
const Navbar = () => {
  const { open } = useSidebar();
  return (
    <nav className="fixed w-full h-16 dark:bg-[var(--sidebar-background)] bg-slate-50 z-10 ">
      <div
        className={clsx(
          " flex flex-row items-center justify-between h-full pl-14 transition-all pr-10",{"pl-14 md:pl-64":open}
        )}
      >
        <h1 className="font-semibold flex  items-center">
          Dashboard
          <SidebarTrigger />
        </h1>
        <div className="flex flex-row justify-center">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
