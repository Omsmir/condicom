"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import {AccountSchema} from "@/lib/vaildation";
import { DashboardHook } from '../../context/Dashboardprovider';
import SingleInformationRow from '@/components/patient/SingleInformationRow';
import CustomSkeleton, { SkeletonType } from '@/components/CustomSkeleton';


interface EditableInformationDataProps { 
  userData: {
    "Account Name": string | undefined;
    "Account Number": string;
    "Date Created": string | undefined;
    "Last Modified": string | undefined;
    Email: string | undefined;
    Role: string | undefined;
    Occupation: string | undefined;
}
isFetching:bo
}
const EditableInformation = ({userData}:{userData:EditableInformationDataProps}) => {

    const {isLoading} = DashboardHook()

    const onSubmit = (values:z.infer<typeof AccountSchema>) => {

    }
    const form = useForm<z.infer<typeof AccountSchema>>({
        resolver: zodResolver(AccountSchema),
        defaultValues: {
          name:  "",
          
        },
      });
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
  )
}

export default EditableInformation
