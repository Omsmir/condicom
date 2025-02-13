"use client"
import React from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { inter } from "@/fonts/fonts";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ItemProps } from "./Collapsible";


const NotCollapsible = ({item}: ItemProps) => {
    const pathname = usePathname();

  return (
    <Fragm
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
          <div className={`font-medium ${inter.className}`}>{item.title}</div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NotCollapsible;
