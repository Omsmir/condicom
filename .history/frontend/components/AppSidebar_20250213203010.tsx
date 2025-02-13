"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Dialog, DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { inter } from "../fonts/fonts";
import { SideBarItems } from "@/lib/constants";
import Image from "next/image";
import { NavMain } from "./NavMenu";
import SideBarFooter from "./sidebar/SideBarFooter";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const AppSidebar = () => {
  const { open, setOpen, isMobile } = useSidebar();

  return (
    <Dialog>
      <Sidebar
        className="border-r dark:border-slate-700 h-screen z-30"
        collapsible="icon"
      >
        <SidebarHeader
          onClick={() => setOpen(!open)}
          className="flex  justify-center items-center h-14 px-4 border-b dark:border-slate-700 p-0 min-w-[25px] "
        >
          <span className={`flex justify-start items-center cursor-pointer `}>
            <Image
              src="/assets/icons/mark.svg"
              alt="Logo"
              width={25}
              height={25}
              className="mr-1 min-w-[25px] min-h-[25px]"
            />
            <h1
              className={clsx(`text-xl font-bold ${inter.className}`, {
                hidden: !open && !isMobile,
              })}
            >
              Dashboard
            </h1>
          </span>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarGroup className="flex-1 p-0">
            <SidebarGroupContent
              className={clsx(
                "flex-1 w-full pt-10 ",
                {
                  "pt-0": open && !isMobile,
                }
              )}
            >
              <VisuallyHidden>
                <DialogTitle>sidebar</DialogTitle>
                <DialogDescription>Here Is A Description</DialogDescription>
              </VisuallyHidden>
              <NavMain items={SideBarItems} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SideBarFooter />

      </Sidebar>
    </Dialog>
  );
};

export default AppSidebar;
