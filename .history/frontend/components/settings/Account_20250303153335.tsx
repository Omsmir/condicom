"use client";
import { Divider } from "@mui/material";
import React from "react";

import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";
import AccountHeader from "./Profile/AccountHeader";
import EditableInformation from "./Profile/EditableInformation";
import Spinner from "../Spinner";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching,isLoading,isError } = useGetUser(session?.user.id);

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
        <AccountHeader />
        <Divider className=" dark:bg-slate-500 m-0 w-full" />
         
         {/* Account Information */}
         {isLoading || isFetching ? <Spinner className="absolute my-auto " size="small" /> : 
         }
        
      </div>
    </div>
  );
};

export default Account;
