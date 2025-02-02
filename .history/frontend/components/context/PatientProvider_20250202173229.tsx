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

interface DashboardContextProps {

}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


  const socket = io("http://localhost:8080");

  // Tables 
  
  return (
    <DashboardContext.Provider
      value={{
        
 
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const PatientHook = () => {
  const Context = useContext(DashboardContext);
  if (!Context) {
    throw new Error("Dashboard Context Must Be within the PatientHook");
  }

  return Context;
};
