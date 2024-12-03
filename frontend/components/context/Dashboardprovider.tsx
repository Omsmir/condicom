"use client";
import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";

import { createContext, useContext, useState } from "react";
import { CalenderHook } from "./CalenderProvider";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

interface DashboardContextProps {
  api: NotificationInstance;
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);


export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [api, contextHolder] = notification.useNotification();

  return (
    <DashboardContext.Provider value={{ api,contextHolder}}>
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
