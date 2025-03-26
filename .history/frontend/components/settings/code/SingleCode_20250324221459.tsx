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
  const UserWithCode = (id: string | undefined) => {
    return users
      ?.filter((user) => user._id === id)
      .map((element) => element.name)
      .join("");
  };
  const data = {
    "assigned with": UserWithCode(code.user) || "not assigned",
    code: code.code,
    used: code.used ? "used" : "not used",
    role: code.role,
    "created at": format(code.createdAt as Date, "Pp"),
  };

  return (
    <div className="grid grid-cols-12 col-span-6 sm:col-span-4 md:col-span-3 mr-2 mt-4 md:mt-0 md:last-of-type:mr-0 p-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      {Object.entries(data).map(([key, value]) => (
        <SingleInformationRow
          innerText={key}
          key={key}
          className="flex justify-start  md:col-span-6 text-[14px]"
        >
          <CustomSkeleton
            SkeletonType={SkeletonType.HEAD}
            innerText={value}
            loading={isLoading}
            classname="min-w-24 text-[12px]"
          />
        </SingleInformationRow>
      ))}
    </div>
  );
};

export default SingleCode;
