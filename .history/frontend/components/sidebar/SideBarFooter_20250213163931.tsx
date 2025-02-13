"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronUp,
  User,
} from "lucide-react";
import LogoutButton from "../togglers/LogoutButton";
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
