"use client"
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {

  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,

} from "@/components/ui/sidebar";
import { inter } from "@/fonts/fonts";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalenderHook } from "../context/CalenderProvider";


export interface ItemProps {
  item:{
    title:string;
    url:string;
    isActive?:boolean;
    icon?:any
    items?: {
        title: string;
        url: string;
        viewport?:number
      }[];
  }

}

const CollapsibleItems = ({item}: ItemProps) => {
    const pathname = usePathname();
    const {setViewPort} = CalenderHook()
    const handelViewPortChange = (viewport:number) => {
      if(){
        
      }
    }
  return (
    <Collapsible
    key={item.title}
    asChild
    defaultOpen={item.isActive}
    className="group/collapsible"
  >
    <SidebarMenuItem className="mb-1">
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          tooltip={item.title}
          className="h-full rounded-xl transition-colors"
        >
          {item.icon && <item.icon />}
          <span className={`font-medium ${inter.className}`}>
            {item.title}
          </span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title} onClick={() => setViewPort(subItem.viewport)}>
              <SidebarMenuSubButton asChild>
                <Link
                  href={subItem.url}
                  className={clsx(
                   
                    {
                      "bg-[var(--sidebar-accent)]  text-slate-50 dark:bg-[var(--sidebar-accent)]":
                        pathname == subItem.url,
                    }
                  )}
                >
                  <div>{subItem.title}</div>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
  )
}

export default CollapsibleItems
