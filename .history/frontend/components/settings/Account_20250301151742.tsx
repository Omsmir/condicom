"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { DashboardHook } from "../context/Dashboardprovider";
import SingleInformationRow from "../patient/SingleInformationRow";
import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";
import { format } from "date-fns";

const Account = () => {
  const {data:session} = useSession()

  const {data,isFetching} = useGetUser(session?.user.id)

  console.log(data?.existingUser)
  
  const userData = {
    'Account Name': data?.existingUser.name,
    'Account Number': `#${(data?.existingUser._id)?.slice(0,12)}`,
    'Date Created': data?.existingUser.createdAt && format(data?.existingUser.createdAt as Date,"PPpp"),
    "Last Modified":data?.existingUser.updatedAt && format(data?.existingUser.updatedAt as Date,"PPpp")
  }

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-sm">
        <div className="flex p-4 w-full">
          <h1 className="text-lg font-medium capitalize">Account info</h1>
        </div>
        <Divider className=" dark:bg-slate-500 m-0 w-full" />

        <div className="grid grid-cols-12 p-8 w-full">
          {Object.entries(userData).map(([key,value]) => (
            <SingleInformationRow
            innerText={key}
            className="text-sm capitalize md:col-span-3"
          >
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              innerText={value}
              loading={isFetching}
              classname="min-w-32 text-sm"
            
            />
          </SingleInformationRow>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
