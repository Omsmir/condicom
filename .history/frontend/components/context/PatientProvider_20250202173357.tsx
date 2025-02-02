"use client";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";

import { createContext, useContext, useState } from "react";

interface PatientContextProps {
    drawerState: boolean
}

const DashboardContext = createContext<PatientContextProps | null>(null);


export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


    const [drawerState,setDrawerState] = useState<boolean>(false)

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
