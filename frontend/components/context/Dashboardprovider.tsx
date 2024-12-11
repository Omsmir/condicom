"use client";
import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";

import { createContext, useContext, useState } from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useTheme } from "next-themes";
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
}

const DashboardContext = createContext<DashboardContextProps | null>(null);


export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [api, contextHolder] = notification.useNotification();
  const [state,setState] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const { theme, setTheme } = useTheme();

  return (
    <DashboardContext.Provider value={{theme,setTheme, api,contextHolder,state,setState,NProgress,open,setOpen}}>
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
