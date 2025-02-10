"use client";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";

import { createContext, useContext, useState } from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useTheme } from "next-themes";
import { io, Socket } from "socket.io-client";
import { Notification } from "@/types";
import { DefaultEventsMap } from "@socket.io/component-emitter";

NProgress.configure({ showSpinner: false, speed: 500 });
interface DashboardContextProps {
  api: NotificationInstance;
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  NProgress: NProgress.NProgress;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  theme: string | undefined;
  setTheme: Dispatch<SetStateAction<string>>;
  allFilter: boolean;
  todayFilter: boolean;
  yesterdayFilter: boolean;
  setAllFilter: Dispatch<SetStateAction<boolean>>;
  setTodayFilter: Dispatch<SetStateAction<boolean>>;
  setYesterdayFilter: Dispatch<SetStateAction<boolean>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  drawerState: boolean;
  setDrawerState: Dispatch<SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [api, contextHolder] = notification.useNotification();
  const [state, setState] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [allFilter, setAllFilter] = useState<boolean>(true);
  const [todayFilter, setTodayFilter] = useState<boolean>(false);
  const [yesterdayFilter, setYesterdayFilter] = useState<boolean>(false);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [loading,set]
  const socket = io("http://localhost:8080");

  // Tables 
  
  return (
    <DashboardContext.Provider
      value={{
        theme,
        setTheme,
        api,
        contextHolder,
        state,
        setState,
        NProgress,
        open,
        setOpen,
        setAllFilter,
        setTodayFilter,
        setYesterdayFilter,
        allFilter,
        todayFilter,
        yesterdayFilter,
        socket,
        drawerState,
        setDrawerState
 
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const DashboardHook = () => {
  const Context = useContext(DashboardContext);
  if (!Context) {
    throw new Error("Dashboard Context Must Be within the DashboardHook");
  }

  return Context;
};
