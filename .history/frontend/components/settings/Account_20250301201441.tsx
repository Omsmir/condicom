"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { DashboardHook } from "../context/Dashboardprovider";
import SingleInformationRow from "../patient/SingleInformationRow";
import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";
import { format } from "date-fns";
import AccountHeader from "./Profile/AccountHeader";
import EditableInformation from "./Profile/EditableInformation";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching } = useGetUser(session?.user.id);

 
  let userData
  if(data)

   userData = {
    "Account Name": { value: data.existingUser.name, title: "name" },
    "Account Number": {value:`#${data.existingUser._id?.slice(0, 11).toUpperCase()}`},
    "Date Created":
      {value:data.existingUser.createdAt &&
      format(data.existingUser.createdAt as Date, "PPpp")},
    "Last Modified":{value:
      data.existingUser.updatedAt &&
      format(data.existingUser.updatedAt as Date, "PPpp")},
    Email: {value:data.existingUser.email},
    Role: {value:data.existingUser.role},
    occupation:{value:data.existingUser.occupation},
  };

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300">
        <AccountHeader />
        <Divider className=" dark:bg-slate-500 m-0 w-full" />

        <EditableInformation userData={userData} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default Account;
