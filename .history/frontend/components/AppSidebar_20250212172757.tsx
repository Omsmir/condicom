"use client";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Dialog, DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import clsx from "clsx";
import { inter } from "../fonts/fonts";
import { useSession } from "next-auth/react";
import { items, sideItems } from "@/lib/constants";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BookOpen, Bot, ChevronUp, Settings2, SquareTerminal, User } from "lucide-react";
import LogoutButton from "./togglers/LogoutButton";
import Image from "next/image";
import ThemeToggle from "./togglers/ToggleTheme";
import { NavMain } from "./NavMenu";
const navitems =[
  {
    title: "Overview",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
]
const AppSidebar = () => {
  const pathname = usePathname();
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();
  const { data: session } = useSession();

  const Item = ({ item }: { item: any;}) => {
    return (
      <SidebarMenuItem
      key={item.title}
        className={clsx(
          `flex max-h-[40px] flex-1 justify-center items-center mb-1 px-4 `,
          { "p-0": !open && !isMobile }
        )}
      >
        <SidebarMenuButton asChild>
          <Link
            href={item.url}
            className={clsx("h-full rounded-xl transition-colors", {
              "bg-[var(--sidebar-accent)]  text-slate-50 dark:bg-[var(--sidebar-accent)]":
                pathname.startsWith(item.url)  
            })}
          >
            <item.icon />
            <span className={`font-medium ${inter.className}`}>
              {item.title}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };
  return (
    <Dialog>
      <Sidebar className="border-r dark:border-slate-700 h-screen z-30" collapsible="icon">
        {/* Header and Trigger */}

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
            {/* Body */}
            <SidebarGroupContent
              className={clsx("flex-1 w-full pt-10 overflow-y-auto sm:overflow-hidden", {
                "pt-0": open && !isMobile,
              })}
            >
              <VisuallyHidden>
                <DialogTitle>sidebar</DialogTitle>
                <DialogDescription>Here Is A Description</DialogDescription>
              </VisuallyHidden>
              {/* <SidebarMenu className="h-full">
                {sideItems.map((item,index) => {
                  if (item.private) {
                    if (session?.user.role === "Admin") {
                      return <Item item={item} key={index}  />;
                    }
                  } else if (item.title === "Pharmacy") {
                    return (
                      <>
                        <SidebarGroupLabel className=" text-slate-500  pl-[1.25rem]  ">
                          Pharmacy
                        </SidebarGroupLabel>
                        <Item item={item} key={index} />
                      </>
                    )
                  }
                    else if (item.title === "Profile") {
                      return (
                        <>
                          <SidebarGroupLabel className=" text-slate-500 pl-[1.25rem] ">
                            Help & Settings
                          </SidebarGroupLabel>
                          <Item item={item} key={index} />
                        </>
                      );
                  } else {
                    return <Item item={item} key={index} />;
                  }
                })}
              </SidebarMenu> */}
                        <NavMain items={navitems} />

            </SidebarGroupContent>
          </SidebarGroup>
          {/* Footer */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="font-medium lowercase whitespace-nowrap transition-colors hover:bg-slate-100 hover:text-dark-300 hover:dark:hover:bg-[var(--sidebar-accent)] hover:dark:text-slate-50">
                      <User /> {session?.user.name}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width] bg-slate-100 dark:bg-[var(--sidebar-accent)] dark:border-[var(--sidebar-accent)]"
                  >
                   
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 p-0 dark:hover:bg-[var(--sidebar-background)]">
                      <ThemeToggle />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 p-0 dark:hover:bg-[var(--sidebar-background)]">
                      <LogoutButton className="flex justify-start w-full" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </Dialog>
  );
};

export default AppSidebar;
