import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import { code, UserInformation } from "@/types";
import { format } from "date-fns";
import React from "react";

const SingleCode = ({
  code,
  users,
  lo
}: {
  code: code;
  users: UserInformation[] | undefined;
}) => {
  const data = {
    "assigned with": code.user || "not assigned",
    code: code.code,
    used: code.used ? "used" : "not used",
    role: code.role,
    "expiration date": format(code.expiration, "PPP"),
    "created at": format(code.expiration, "PPP"),
  };
  return (
    <div className="grid grid-cols-12 col-span-6 sm:col-span-4 md:col-span-3 mr-2 last-of-type:mr-0 p-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      {Object.entries(data).map(([key, value]) => (
        <SingleInformationRow
          innerText={key}
          key={value}
          className="flex justify-start col-span-12 sm:col-span-6 md:col-span-4"
        >
          {" "}
          <CustomSkeleton SkeletonType={SkeletonType.HEAD} innerText={value}   />
        </SingleInformationRow>
      ))}
    </div>
  );
};

export default SingleCode;
