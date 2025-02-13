"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Dialog, DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { inter } from "../fonts/fonts";
import { useSession } from "next-auth/react";
import { SideBarItems } from "@/lib/constants";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  BookOpen,
  Bot,
  ChevronUp,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";
import LogoutButton from "./togglers/LogoutButton";
import Image from "next/image";
import ThemeToggle from "./togglers/ToggleTheme";
import { NavMain } from "./NavMenu";
const AppSidebar = () => {
  const { open, setOpen, isMobile } = useSidebar();
  const { data: session } = useSession();

  return (
    <Dialog>
      <Sidebar
        className="border-r dark:border-slate-700 h-screen z-30"
        collapsible="icon"
      >
        {/* Header and Trigger */}

        <SidebarHeader
          onClick={() => setOpen(!open)}
          className="flex  justify-center items-center h-14 px-4 border-b dark:border-slate-700 p-0 min-w-[25px] "
        >
          <span className={`flex justify-start items-center cursor-pointer `}>
            <Image
              src="/assets/icons/mark.svg"
              alt="Logo"
              width={25}
              height={25}
              className="mr-1 min-w-[25px] min-h-[25px]"
            />
            <h1
              className={clsx(`text-xl font-bold ${inter.className}`, {
                hidden: !open && !isMobile,
              })}
            >
              Dashboard
            </h1>
          </span>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarGroup className="flex-1 p-0">
            {/* Body */}
            <SidebarGroupContent
              className={clsx(
                "flex-1 w-full pt-10 overflow-y-auto sm:overflow-hidden",
                {
                  "pt-0": open && !isMobile,
                }
              )}
            >
              <VisuallyHidden>
                <DialogTitle>sidebar</DialogTitle>
                <DialogDescription>Here Is A Description</DialogDescription>
              </VisuallyHidden>
              <NavMain items={SideBarItems} />
            </SidebarGroupContent>
          </SidebarGroup>
          {/* Footer */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="font-medium lowercase whitespace-nowrap transition-colors hover:bg-slate-100 hover:text-dark-300 hover:dark:hover:bg-[var(--sidebar-accent)] hover:dark:text-slate-50">
                      <User /> {session?.user.name}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width] bg-slate-100 dark:bg-[var(--sidebar-accent)] dark:border-[var(--sidebar-accent)]"
                  >
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 p-0 dark:hover:bg-[var(--sidebar-background)]">
                      <ThemeToggle />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 p-0 dark:hover:bg-[var(--sidebar-background)]">
                      <LogoutButton className="flex justify-start w-full" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </Dialog>
  );
};

export default AppSidebar;
