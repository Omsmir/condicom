import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import { cn } from "@/lib/utils";
import { code, UserInformation } from "@/types";
import { differenceInDays, format } from "date-fns";
import React from "react";

interface SingleCodeProps {
  users: UserInformation[] | undefined;
  code: code;
  isLoading: boolean;
}

const SingleCode = ({ code, users, isLoading }: SingleCodeProps) => {
  const UserWithCode = (id: string | undefined) => {
    return users
      ?.filter((user) => user._id === id)
      .map((element) => element.name)
      .join("");
  };

  const data = {
    code: code.code,
    "assigned with": UserWithCode(code.user) || "not assigned",
    role: code.role,
    used: code.used ? "used" : "not used",
    "created at": format(code.createdAt as Date, "P"),
    "remaining days": code.expiration ? `${differenceInDays(code.expiration as Date , new Date())} days`   : "not assigned",

  };

  return (
    <div className="flex flex-col col-span-6 md:col-span-4 lg:col-span-3 mr-2 mt-4  p-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      
      <div className="grid
      "></div>
    </div>
  );
};

export default SingleCode;
