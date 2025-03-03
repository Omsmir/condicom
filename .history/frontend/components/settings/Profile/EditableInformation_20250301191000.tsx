"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import { AccountSchema } from "@/lib/vaildation";
import { DashboardHook } from "../../context/Dashboardprovider";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { medicalSpecialties } from "@/lib/constants";

interface EditableInformationDataProps {
  userData: {
    "Account Name": string | undefined;
    "Account Number": string;
    "Date Created": string | undefined;
    "Last Modified": string | undefined;
    Email: string | undefined;
    Role: string | undefined;
    occupation: string | undefined;
  };
  isFetching: boolean;
}
const EditableInformation = ({
  userData,
  isFetching,
}: EditableInformationDataProps) => {
  const { isLoading } = DashboardHook();

  const onSubmit = (values: z.infer<typeof AccountSchema>) => {};
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: userData["Account Name"],
      occuaption:userData.occupation
    },
  });


  const FieldEnumration = ({key,value}:{key:string,value:string}) => {
    switch(key){
      case "Account Name":
        return (
          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name={value} />
        )
      case "occupation":
        return (
          <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name={value}>
            {medicalSpecialties.map((element,index))}
          </CustomFormField>
        )  
        default: return ""
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 p-8 pb-10 pt-0 w-full "
      >
        {Object.entries(userData).map(([key, value], index) => (
          <SingleInformationRow
            innerText={key}
            key={key}
            className={`text-sm md:col-span-4 lg:col-span-3 mt-10`}
          >
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              innerText={value}
              loading={isFetching}
              classname="min-w-32 text-sm"
            />
          </SingleInformationRow>
        ))}
      </form>
    </Form>
  );
};

export default EditableInformation;
