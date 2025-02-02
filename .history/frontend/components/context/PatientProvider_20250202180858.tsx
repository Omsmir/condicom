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

const Patient = createContext<PatientContextProps | null>(null);


export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


    const [drawerState,setDrawerState] = useState<boolean>(false)

  // Tables 
  
  return (
    <Patient.Provider
      value={{
        drawerState,
        setDrawerState
 
      }}
    >
      {children}
    </Patient.Provider>
  );
};

export const PatientHook = () => {
  const Context = useContext(Pat);
  if (!Context) {
    throw new Error("Patient Context Must Be within the PatientHook");
  }

  return Context;
};
