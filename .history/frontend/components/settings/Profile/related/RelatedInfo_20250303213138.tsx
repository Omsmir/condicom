"use client";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import { UserInformation } from "@/types";
import clsx from "clsx";
import { format } from "date-fns";
import React, { Fragment } from "react";

const RelatedInfo = ({
  user,
  isFetching,
}: {
  user: UserInformation | undefined;
  isFetching: boolean;
}) => {
  const data = {
    "birth date": format(user?.birthDate as Date,"Pp"),
    "gender": user?.gender,
    "height": user?.address || "not assigned",
    role: user?.role,
  };
  return (
    <div className="grid grid-cols-12  p-8 pb-10 pt-0 w-full">
      {Object.entries(data).map(([key, value]) => (
        <SingleInformationRow
          innerText={key}
          key={key}
          className={`text-sm md:col-span-4 lg:col-span-3 mt-8`}
        >
          <CustomSkeleton
            SkeletonType={SkeletonType.HEAD}
            innerText={value}
            loading={isFetching}
            classname={clsx("min-w-32 text-sm", {
              "text-blue-800": value === "Admin",
            })}
          />
        </SingleInformationRow>
      ))}
    </div>
  );
};
export default RelatedInfo