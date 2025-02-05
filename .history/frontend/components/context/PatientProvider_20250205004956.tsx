"use client";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";

import { createContext, useContext, useState } from "react";

interface PatientContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  activeLink: string;
  setActiveLink: Dispatch<SetStateAction<string>>;
}

const PatientContext = createContext<PatientContextProps | null>(null);

export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState("#Patient Information");

  // Tables

  return (
    <PatientContext.Provider
      value={{
        drawerState,
        setDrawerState,
        loading,
        setLoading,
        activeLink,
        setActiveLink,
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
