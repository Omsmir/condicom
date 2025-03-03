"use client";
import { UserInformation } from "@/types";
import { format } from "date-fns";
import React, { Fragment } from "react";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { medicalSpecialties } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import { AccountHook } from "@/components/context/AccountProvider";
import { EditFilled } from "@ant-design/icons";

const FieldEnumration = ({
  name,
  value,
  form,
}: {
  name: string;
  value: string;
  form: any;
}) => {
  switch (name) {
    case "Account Name":
      return (
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder={value}
          className="max-h-[25px] w-32 overflow-hidden rounded-sm"
        />
      );
    case "occupation":
      return (
        <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="occupation"
        placeholder={value}        
      >
        {medicalSpecialties.map((medicalValue, index) => (
          <SelectItem  key={index} value={medicalValue.specialty ?? value}>
            <div className="flex cursor-pointer justify-center items-center">
              <p className="text-md mx-2">{medicalValue.specialty}</p>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>
      );
    default:
      return null;
  }
};
const AccountInfo = ({
  user,
  isFetching,
  form,
}: {
  user: UserInformation | undefined;
  isFetching: boolean;
  form: any;
}) => {
  const { ProfileEdit, setProfileEdit } = AccountHook();

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
    { value: user?.email, title: "Email" },
    { value: user?.role, title: "Role" },
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
            <FieldEnumration
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
