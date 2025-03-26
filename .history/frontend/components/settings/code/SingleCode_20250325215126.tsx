import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import { code, UserInformation } from "@/types";
import { addWeeks, differenceInDays, format, isAfter } from "date-fns";
import React, { useState } from "react";
import DeleteCode from "./DeleteCode";
import { Badge } from "antd";
interface SingleCodeProps {
  users: UserInformation[] | undefined;
  code: code;
  isLoading: boolean;
}

const Preferences = ({ code }: { code: code }) => {
  const [currDate, setCurrDate] = useState(code.createdAt);

  const newExpirationDate = addWeeks(currDate, 1);

  return (
    <React.Fragment>
      {}
      {isAfter(newExpirationDate, new Date()) && <Badge>new</Badge>}
    </React.Fragment>
  );
};
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
    "remaining days": code.expiration
      ? `${differenceInDays(code.expiration as Date, new Date())} days`
      : "not assigned",
  };

  return (
    <div className="flex flex-col col-span-6 md:col-span-4 min-h-[400px] sm:min-h-[250px] lg:col-span-3 mr-2 mt-4  pt-2 pb-4 px-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      <div className="flex justify-between mt-0">
        <Preferences code={code} />
        <DeleteCode code={code} />
      </div>
      <div className="grid grid-cols-12">
        {Object.entries(data).map(([key, value], index) => (
          <SingleInformationRow
            innerText={key}
            key={key}
            className={`flex justify-start md:col-span-6 text-[14px]  ${
              index > 1 && "mt-4"
            }`}
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
    </div>
  );
};

export default SingleCode;
