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
          className="max-h-[225px] "
        >
          {medicalSpecialties.map((element, index) => (
            <SelectItem
              value={element.specialty}
              key={element.specialty}
              className="cursor-pointer transition-colors hover:bg-slate-200"
            >
              <div className="flex">
                <p className="text-md text-black capitalize ">
                  {element.specialty}
                </p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
      );
    default:return null
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
     value: user?.name, title: "Account Name",editable:true 
    },
    {
     value: `#${user?._id?.slice(0, 11).toUpperCase()}` ,title:"Account Number"
     },
    { 
      value: user?.createdAt && format(user?.createdAt as Date, "PPpp"),title:"Date Created"
    },
   { "Last Modified": {
      value: user?.updatedAt && format(user?.updatedAt as Date, "PPpp"),
    }},
   { Email: { value: user?.email }},
   { Role: { value: user?.role }},
   { occupation: { value: user?.occupation ,editable:true }},
];
  return (
    userData.map((element) => {
        if(element["Account Name"].)
    })
  )
};

export default AccountInfo;
