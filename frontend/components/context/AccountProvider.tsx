"use client";
import { AccountSchema } from "@/lib/vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface AccountContextProps {
  ProfileEdit: boolean;
  isLoading: boolean;
  AccountEdit: boolean;
  setProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountEdit: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<{
    name?: string | undefined;
}, any, undefined>
}

const AccountContext = createContext<AccountContextProps | null>(null);

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [ProfileEdit, setProfileEdit] = useState<boolean>(false);
  const [AccountEdit, setAccountEdit] = useState<boolean>(false);

  const [isLoading,setIsLoading] = useState<boolean>(false)
  
  const session = useSession()
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: session.data?.user.name as string
      
    },
  });
  return (
    <AccountContext.Provider value={{ ProfileEdit,AccountEdit,isLoading, setProfileEdit,setAccountEdit,setIsLoading ,form}}>
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

