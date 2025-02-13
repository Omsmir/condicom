"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import CollapsibleItems, { ItemProps } from "./sidebar/Collapsible";
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
interface checkSidebarTitleExistanceProps {
  sideItemTitle: string | undefined;
  CollapsibleItems?: ({ item }: ItemProps) => JSX.Element
  NotCollapsible?: ({ item }: ItemProps) => JSX.Element
}
const checkSidebarTitleExistance = ({sideItemTitle,CollapsibleItems,NotCollapsible}:checkSidebarTitleExistanceProps) => {
  switch(sideItemTitle){
    case "Pharmacy":
      return (
        <Fragment>
          <SidebarGroupLabel className="text-slate-500 capitalize ">
            {sideItemTitle}
          </SidebarGroupLabel>
        </Fragment>
      )
  }
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
             
                return <CollapsibleItems item={item} key={item.title} />;
              
            }
          } else {
            if (item.private) {
              if (session?.user.role === "Admin")
                return <NotCollapsible item={item} key={item.title} />;
            } else {
              
                return <NotCollapsible item={item} key={item.title} />;
              
            }
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
