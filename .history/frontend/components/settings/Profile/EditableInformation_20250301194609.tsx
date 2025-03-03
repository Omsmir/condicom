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
import { SelectItem } from "@/components/ui/select";
import { AccountHook } from "@/components/context/AccountProvider";

type value = {
  value: string | undefined;
  title: string;
}
interface EditableInformationDataProps {
  userData: {
    "Account Name": value;
    "Account Number": value;
    "Date Created": value;
    "Last Modified": value;
    Email: string | undefined;
    Role: string | undefined;
    occupation: string | undefined;
}
  isFetching: boolean;
}
const EditableInformation = ({
  userData,
  isFetching,
}: EditableInformationDataProps) => {
  const { isLoading } = DashboardHook();

  const {ProfileEdit,setProfileEdit} = AccountHook()
  const onSubmit = (values: z.infer<typeof AccountSchema>) => {};
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: userData["Account Name"].value,
      occuaption: userData.occupation,
    },
  });

  const FieldEnumration = ({ key, value }: { key: string; value: string }) => {
    switch (key) {
      case "Account Name":
        return (
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={value}
          />
        );
      case "occupation":
        return (
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name={value}
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
  };
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
            {ProfileEdit ? <FieldEnumration key={key} value={} /> : <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              innerText={value}
              loading={isFetching}
              classname="min-w-32 text-sm"
            />}
          </SingleInformationRow>
        ))}
      </form>
    </Form>
  );
};

export default EditableInformation;
