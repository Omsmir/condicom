"use client"
 import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {Dialog, DialogTitle,DialogDescription } from "./ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link"
import clsx from "clsx"
import {inter} from "../fonts/fonts"
import { useSession } from "next-auth/react";
import { sideItems } from "@/lib/constants";


const AppSidebar = () => {
    const pathname = usePathname()
const {open,setOpen,openMobile,setOpenMobile} = useSidebar()
const {data:session} = useSession()

const handleSidebar = () => {
  if(!open)
  setOpen(true)
  if(openMobile)
  setOpenMobile(false)
}

const Item = ({item}:{item:any}) => {
  return (
    (
      <SidebarMenuItem key={item.title} className={clsx(`flex max-h-[40px] flex-1 justify-center items-center mb-1 px-4`,{"p-0":!open})}>
        <SidebarMenuButton asChild>
          <Link href={item.url} onClick={handleSidebar} className={clsx("h-full",{"bg-[hsl(var(--sidebar-accent))] dark:bg-[var(--sidebar-accent)]":pathname === item.url})}>
            <item.icon />
            <span className={`font-medium ${inter.className}`}>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  )
}
  return (
<Dialog>
    <Sidebar className="border-none" collapsible="icon">
      <SidebarContent className="flex-1">
        <SidebarGroup className="flex-1 p-0">
          <SidebarGroupLabel className="text-xl my-4">Dashboard </SidebarGroupLabel>
          <SidebarGroupContent className={clsx("flex-1 w-full pt-10",{"pt-0":open})}>
            <VisuallyHidden>
            <DialogTitle>sidebar</DialogTitle>
            <DialogDescription>Here Is A Description</DialogDescription>
            </VisuallyHidden>
            <SidebarMenu className="h-full">
              
              {sideItems.map((item) => {
                if(item.private){
                if(session?.user.role === "admin"){
                  return (
                    <Item item={item} key={item.title} />
                   )
                }
                }else {
                  return (
                    <Item item={item} key={item.title} />

                  )
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </Dialog>
  )
}

export default AppSidebar