import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import { code, UserInformation } from "@/types";
import { format } from "date-fns";
import React from "react";

interface SingleCodeProps {
  users: UserInformation[] | undefined;
  code: code;
  isLoading: boolean;
}

const SingleCode = ({ code, users, isLoading }: SingleCodeProps) => {
  const data = {
    "assigned with": code.user || "not assigned",
    code: code.code,
    used: code.used ? "used" : "not used",
    role: code.role,

  };
  return (
    <div className="grid grid-cols-12 col-span-6 sm:col-span-4 md:col-span-3 mr-2 last-of-type:mr-0 p-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      {Object.entries(data).map(([key, value]) => (
        <SingleInformationRow
          innerText={key}
          key={key}
          className="flex justify-start  "
        >
          <CustomSkeleton
            SkeletonType={SkeletonType.HEAD}
            innerText={value}
            loading={isLoading}
            classname="min-w-24 "
          />
        </SingleInformationRow>
      ))}
    </div>
  );
};

export default SingleCode;
