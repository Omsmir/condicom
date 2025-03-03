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

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300">
        <AccountHeader />
        <Divider className=" dark:bg-slate-500 m-0 w-full" />
         (
          <EditableInformation
            user={data.existingUser}
            isFetching={isFetching}
          />
        )}
      </div>
    </div>
  );
};

export default Account;
