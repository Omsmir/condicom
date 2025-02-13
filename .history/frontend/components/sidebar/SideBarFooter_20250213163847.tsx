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
  ChevronUp,
  User,
} from "lucide-react";
import LogoutButton
import Image from "next/image";
import ThemeToggle from "../togglers/ToggleTheme";



const SideBarFooter = () => {
    const {data:session} = useSession()
  return (
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
  )
}

export default SideBarFooter
