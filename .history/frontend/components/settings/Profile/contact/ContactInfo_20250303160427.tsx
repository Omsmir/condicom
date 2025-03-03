"use client";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import { UserInformation } from "@/types";
import clsx from "clsx";
import React, { Fragment } from "react";

const ContactInfo = ({
  user,
  isFetching,
}: {
  user: UserInformation | undefined;
  isFetching: boolean;
}) => {
  const data = {
    "email address": user?.email,
    "contact number": user?.phone,
    role: user?.role,
    address: user?.address || "not assigned",
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
            classname={clsx("min-w-32 text-sm",{"text-slate-600":})}
          />
        </SingleInformationRow>
      ))}
    </div>
  );
};

export default ContactInfo;
