"use client";
import { AccountSchema } from "@/lib/vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AccountContextProps {
  ProfileEdit: boolean;
  isLoading: boolean
  setProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountContext = createContext<AccountContextProps | null>(null);

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [ProfileEdit, setProfileEdit] = useState<boolean>(false);
  const [isLoading,setIsLoading] = useState<boolean>(false)
  
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: session?.user.name as string,
      occupation: user?.occupation,
    },
  });
  return (
    <AccountContext.Provider value={{ ProfileEdit,isLoading, setProfileEdit,setIsLoading }}>
      {children}
    </AccountContext.Provider>
  );
};




export const AccountHook = () => {
    const context = useContext(AccountContext)

    if(!context){
        throw new Error("Account Context Must Be Used Within AccountProvider")
    }
    return context
}

