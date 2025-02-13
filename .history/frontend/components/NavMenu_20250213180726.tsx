"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import CollapsibleItems from "./sidebar/Collapsible";
import NotCollapsible from "./sidebar/NotCollapsible";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

export interface itemProps {
  items: {
    title: string;
    url: string;
    icon?: any;
    private?: boolean;
    isActive?: boolean;
    sideItemTitle?:string
    group: boolean;
    items?: {
      title: string;
      url: string;
      viewport?: number;
    }[];
  }[];

}

export function NavMain({ items }: itemProps) {
  const { data: session } = useSession();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          if (item.group) {
            if (item.private) {
              if (session?.user.role === "Admin")
                return <CollapsibleItems item={item} key={item.title} />;
            } else {
              if (item.title === "Settings") {
                return (
                  <Fragment>
                    <SidebarGroupLabel className=" text-slate-500  w-full whitespace-nowrap capitalize">
                      settings & profile
                    </SidebarGroupLabel>
                    <CollapsibleItems item={item} key={item.title} />
                  </Fragment>
                );
              } else {
                return <CollapsibleItems item={item} key={item.title} />;
              }
            }
          } else {
            if (item.private) {
              if (session?.user.role === "Admin")
                return <NotCollapsible item={item} key={item.title} />;
            } else {
              
                 return <NotCollapsible item={item} key={item.title} />;
              }
            }
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
