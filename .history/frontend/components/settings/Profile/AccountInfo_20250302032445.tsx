"use client"
import { UserInformation } from '@/types';
import { format } from 'date-fns';
import React, { Fragment } from 'react'
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { medicalSpecialties } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import { AccountHook } from "@/components/context/AccountProvider";


const FieldEnumration = ({ key, value ,form}: { key: string; value: string,form:any }) => {
   const FieldOfType = () => {
    switch (key) {
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
        default:
          return "";
      }
   }
    return (
        <Fragment>
            
        </Fragment>
    )
  };
const AccountInfo = ({user,isFetching,form}:{user:UserInformation | undefined,isFetching:boolean,form:any}) => {
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
