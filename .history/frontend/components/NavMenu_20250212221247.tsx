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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: any;
    private?: boolean;
    isActive?: boolean;
    group?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {


  const pathname = usePathname();
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.group) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem className="my-2">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span className={`font-medium ${inter.className}`}>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url} >
                              <div >{subItem.title}</div>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem
              key={item.title}
            >
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={clsx("h-full rounded-xl transition-colors", {
                    "bg-[var(--sidebar-accent)]  text-slate-50 dark:bg-[var(--sidebar-accent)]":
                      pathname.startsWith(item.url),
                  })}
                >
                  <item.icon />
                  <div className={`font-medium ${inter.className}`}>
                    {item.title}
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
