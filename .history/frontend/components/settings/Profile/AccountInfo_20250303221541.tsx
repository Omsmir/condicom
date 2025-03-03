"use client";
import { UserInformation } from "@/types";
import { format } from "date-fns";
import React from "react";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";

import { AccountHook } from "@/components/context/AccountProvider";
import { EditFilled } from "@ant-design/icons";
import FieldEnumeration from "../FieldEnumeration";


const AccountInfo = ({
  user,
  isFetching,
  form,
}: {
  user: UserInformation | undefined;
  isFetching: boolean;
  form: any;
}) => {
  const { ProfileEdit } = AccountHook();

  const userData = [
    {
      value: user?.name,
      title: "Account Name",
      editable: true,
    },
    {
      value: `#${user?._id?.slice(0, 11).toUpperCase()}`,
      title: "Account Number",
    },
    {
      value: user?.createdAt && format(user?.createdAt as Date, "PPpp"),
      title: "Date Created",
    },
    {
      value: user?.updatedAt && format(user?.updatedAt as Date, "PPpp"),
      title: "Last Modified",
    },
    { value: user?.occupation, editable: true, title: "occupation" },
  ];
  return userData.map((element) => {
    if (element.editable) {
      return (
        <SingleInformationRow
          innerText={element.title}
          key={element.title}
          className={`text-sm md:col-span-4 lg:col-span-3 mt-8`}
          editableIcon={<EditFilled className="text-[12px] text-blue-800" />}
        >
          {ProfileEdit ? (
            <FieldEnumeration
              form={form}
              name={element.title}
              value={element.value as string}
            />
          ) : (
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              innerText={element.value}
              loading={isFetching}
              classname="min-w-32 text-sm"
            />
          )}
        </SingleInformationRow>
      );
    }
    return (
      <SingleInformationRow
        innerText={element.title}
        key={element.title}
        className={`text-sm md:col-span-4 lg:col-span-3 mt-8`}
      >
        <CustomSkeleton
          SkeletonType={SkeletonType.HEAD}
          innerText={element.value}
          loading={isFetching}
          classname="min-w-32 text-sm"
        />
      </SingleInformationRow>
    );
  });
};

export default AccountInfo;
