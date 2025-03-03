"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { DashboardHook } from "../context/Dashboardprovider";

const Account = () => {

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-sm">
        <div className="flex p-4 w-full">
           <h1 className="text-lg font-medium capitalize">Account info</h1>
        </div>
        <Divider className=" dark:bg-slate-500 m-0" />

        <div className="gird grid p-4 w-full">

        </div>
      </div>
    </div>
  );
};

export default Account;
