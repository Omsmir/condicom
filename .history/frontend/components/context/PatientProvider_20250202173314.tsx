"use client";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";

import { createContext, useContext, useState } from "react";



import { DefaultEventsMap } from "@socket.io/component-emitter";

interface PatientContextProps {

}

const DashboardContext = createContext<PatientContextProps | null>(null);

export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {



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
