"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { DashboardHook } from "../context/Dashboardprovider";
import SingleInformationRow from "../patient/SingleInformationRow";
import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching } = useGetUser(session?.user.id);

  console.log(data?.existingUser);

  const userData = {
    "Account Name": data?.existingUser.name,
    "Account Number": `#${data?.existingUser._id?.slice(0, 11).toUpperCase()}`,
    "Date Created":
      data?.existingUser.createdAt &&
      format(data?.existingUser.createdAt as Date, "PPpp"),
    "Last Modified":
      data?.existingUser.updatedAt &&
      format(data?.existingUser.updatedAt as Date, "PPpp"),
    Email: data?.existingUser.email,
    Role: data?.existingUser.role,
    Occupation: data?.existingUser.occupation,
  };

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300">
        <div className="flex justify-between items-center p-4 w-full">
          <h1 className="text-lg font-medium capitalize">Account info</h1>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-slate-100 dark:bg-[var(--sidebar-accent)] p-0 border-0"
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]"
                  onClick={printTemplate}
                >
                  print
                </DropdownMenuIte>
               
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Divider className=" dark:bg-slate-500 m-0 w-full" />

        <div className="grid grid-cols-12 p-8 pb-10 pt-0 w-full ">
          {Object.entries(userData).map(([key, value], index) => (
            <SingleInformationRow
              innerText={key}
              key={key}
              className={`text-sm md:col-span-4 lg:col-span-3 mt-10`}
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
