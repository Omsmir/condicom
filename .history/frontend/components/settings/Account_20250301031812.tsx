"use client";
import { Divider } from "@mui/material";
import React from "react";

const Account = () => {
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-sm">
        <div className="flex p-4 w-full">
          <h1 className="text-lg font-medium capitalize  w-full">
            Account Info
          </h1>
        </div>
        <Divider className=" dark:bg-slate-500 m-0" />
      </div>
    </div>
  );
};

export default Account;
