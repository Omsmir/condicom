"use client";
import { UserInformation } from "@/types";
import { format } from "date-fns";
import React from "react";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import { AccountHook } from "@/components/context/AccountProvider";
import { EditFilled } from "@ant-design/icons";
import FieldEnumeration from "../../FieldEnumeration";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { AccountSchema } from "@/lib/vaildation";

interface RelatedInfoProps {
    user:UserInformation | undefined;
    isFetching:boolean;
    form:UseFormReturn<z.infer<typeof AccountSchema>>
}

const RelatedInfo = ({
  user,
  isFetching,
  form,
}: RelatedInfoProps) => {
  const { ProfileEdit } = AccountHook();

  const userData = [
    {
      value: user?.gender,
      title: "gender",
      editable: true,
    },
    {
      value: user?.birthDate && format(user?.createdAt as Date, "PPpp"),
      title: "Birth date",
    },
    { value: user?.weight, editable: true, title: "weight" },
    { value: user?.height, editable: true, title: "height" },
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

export default RelatedInfo;