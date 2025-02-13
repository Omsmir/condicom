"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import clsx from "clsx";
import { inter } from "@/fonts/fonts";
import { usePathname } from "next/navigation";
import CollapsibleItems from "./sidebar/Collapsible";


export interface itemProps {
  items: {
    title: string;
    url: string;
    icon?: any;
    private?: boolean;
    isActive?: boolean;
    group: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}


export function NavMain({
  items,
}:itemProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.group) {
            return (
           <CollapsibleItems item={} />
            );
          } else {
            return (
              <SidebarMenuItem key={item.title} className="mb-1">
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={clsx("h-full rounded-xl transition-colors", {
                      "bg-[var(--sidebar-accent)]  text-slate-50 dark:bg-[var(--sidebar-accent)]":
                        pathname == item.url,
                    })}
                  >
                    <item.icon />
                    <div className={`font-medium ${inter.className}`}>
                      {item.title}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
