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
    sideItemTitle?: string;
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
  children?: React.ReactNode;
}
const checkSidebarTitleExistance = ({
  sideItemTitle,
  children,
}: checkSidebarTitleExistanceProps) => {
  switch (sideItemTitle) {
    case "Pharmacy":
      return (
        <Fragment>
          <SidebarGroupLabel className="text-slate-500 capitalize w-full whitespace-nowrap">
            {sideItemTitle}
          </SidebarGroupLabel>
          {children}
        </Fragment>
      );
      default: return children
  }

};
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
             return <Che
            }
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
