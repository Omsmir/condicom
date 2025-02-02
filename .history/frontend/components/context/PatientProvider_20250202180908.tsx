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
    setDrawerState: Dispatch<SetStateAction<boolean>>
}

const PatientContext = createContext<PatientContextProps | null>(null);


export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


    const [drawerState,setDrawerState] = useState<boolean>(false)

  // Tables 
  
  return (
    <PatientContext.Provider
      value={{
        drawerState,
        setDrawerState
 
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const PatientHook = () => {
  const Context = useContext(PatientContext);
  if (!Context) {
    throw new Error("Patient Context Must Be within the PatientHook");
  }

  return Context;
};
