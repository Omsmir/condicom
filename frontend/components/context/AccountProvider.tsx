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
  isDeleteLoading: boolean
  AccountEdit: boolean;
  setProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
  form: UseFormReturn<{
    name?: string | undefined;
}, any, undefined>
open: boolean
setOpen: React.Dispatch<React.SetStateAction<boolean>>
ResetState: boolean;
setResetState: React.Dispatch<React.SetStateAction<boolean>>;
emailSent: boolean;
setEmailSent: React.Dispatch<React.SetStateAction<boolean>>
isChangingEmail: boolean;
setIsChangingEmail: React.Dispatch<React.SetStateAction<boolean>>;
isChangingPicture: boolean
setIsChangingPicture: React.Dispatch<React.SetStateAction<boolean>>
setIsVerifyingEmail: React.Dispatch<React.SetStateAction<boolean>>
isVerifyingEmail: boolean
}

const AccountContext = createContext<AccountContextProps | null>(null);

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [ProfileEdit, setProfileEdit] = useState<boolean>(false);
  const [AccountEdit, setAccountEdit] = useState<boolean>(false);

  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isDeleteLoading,setIsDeleteLoading] = useState<boolean>(false)
  const[isChangingEmail,setIsChangingEmail] = useState<boolean>(false)
  const[isChangingPicture,setIsChangingPicture] = useState<boolean>(false)
  const [isVerifyingEmail,setIsVerifyingEmail] = useState(false)

  const [ResetState,setResetState] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const session = useSession()
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: session.data?.user.name as string
      
    },
  });
  return (
    <AccountContext.Provider value={{isVerifyingEmail,setIsVerifyingEmail,isChangingEmail,setIsChangingEmail,isChangingPicture,setIsChangingPicture, ProfileEdit,AccountEdit,isLoading,isDeleteLoading,open,ResetState,emailSent,setEmailSent,setResetState,setOpen,setIsDeleteLoading, setProfileEdit,setAccountEdit,setIsLoading ,form}}>
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

