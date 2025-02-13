"use client";
import {
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
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
      viewport?:number
    }[];
  }[];
}

export function NavMain({ items }: itemProps) {
  const {data:session} = useSession()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          if(item.group){
            if(item.private){
              if(session?.user.role === "Admin") return <CollapsibleItems item={item} key={item.title} />
            }else {
              return <CollapsibleItems item={item} key={item.title} />
            }
          }else {
            if(item.private){
              if(session?.user.role === "Admin") return <NotCollapsible item={item} key={item.title} />
            }else {
             if(item.title === "pharmacy") {
              return (
                <SidebarGroupLabel className=" text-slate-500  pl-[1.25rem]  ">
                Pharmacy
              </SidebarGroupLabel>
              )
             }
            }
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
