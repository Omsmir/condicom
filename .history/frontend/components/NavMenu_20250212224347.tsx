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
import NotCollapsible from "./sidebar/NotCollapsible";
import { useSession } from "next-auth/react";

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

export function NavMain({ items }: itemProps) {
  const {data:session} = useSession()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          if (item.group) {
           
          } else {
            return <NotCollapsible key={item.title} item={item} />;
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
