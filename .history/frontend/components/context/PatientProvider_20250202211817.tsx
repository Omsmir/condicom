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
    setDrawerState: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const PatientContext = createContext<PatientContextProps | null>(null);


export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {


    const [drawerState,setDrawerState] = useState<boolean>(false)
    const[loading,setLoading] = useState<boolean>(true)
    const [activeLink, setActiveLink] = useState("#part-1");

  // Tables 
  
  return (
    <PatientContext.Provider
      value={{
        drawerState,
        setDrawerState,
        loading,
        setLoading
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
