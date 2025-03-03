"use client"
import { UserInformation } from '@/types';
import { format } from 'date-fns';
import React from 'react'
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { medicalSpecialties } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import { AccountHook } from "@/components/context/AccountProvider";

const AccountInfo = ({user,isFetching}:{user:UserInformation,is}) => {
  const { ProfileEdit, setProfileEdit } = AccountHook();

    const userData = {
        "Account Name": { value: user?.name, title: "name" },
        "Account Number": {value:`#${user?._id?.slice(0, 11).toUpperCase()}`},
        "Date Created":
          {value:user?.createdAt &&
          format(user?.createdAt as Date, "PPpp")},
        "Last Modified":{value:
          user?.updatedAt &&
          format(user?.updatedAt as Date, "PPpp")},
        Email: {value:user?.email},
        Role: {value:user?.role},
        occupation:{value:user?.occupation},
      };
  return (
    Object.entries(userData).map(([key, value], index) => (
        <SingleInformationRow
          innerText={key}
          key={key}
          className={`text-sm md:col-span-4 lg:col-span-3 mt-10`}
        >
          {ProfileEdit && (key === "Account Name" || key === "occupation") ? (
            FieldEnumration({ key, value: value.value as string })
          ) : (
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              innerText={value.value}
              loading={isFetching}
              classname="min-w-32 text-sm"
            />
          )}
        </SingleInformationRow>
      ))
  )
}

export default AccountInfo
