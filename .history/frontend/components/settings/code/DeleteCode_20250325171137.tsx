"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/togglers/SubmitButton";
import { AccountHook } from "@/components/context/AccountProvider";
import {  CodeDeletionSchema} from "@/lib/vaildation";
import CustomDialog, { DialogTypes } from "@/components/CustomDialog";
import { code } from "@/types";
import { DashboardHook } from "@/components/context/Dashboardprovider";


interface codeDeletionInterface {
    code:code;
   
}

const DeleteCode = ({code}:codeDeletionInterface) => {
  const { isLoading, setIsLoading } = AccountHook();
  const {contextHolder,api} = DashboardHook()

  const onSubmit = async (values: z.infer<typeof CodeDeletionSchema>) => {
  
    const formData = new FormData()

    if(values.code !== "" || values.code !== u){

    }

    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const form = useForm<z.infer<typeof CodeDeletionSchema>>({
    resolver: zodResolver(CodeDeletionSchema),
    defaultValues: {
        code:""
    },
  });
  return (
    <CustomDialog DialogTitle="delete code" DialogType={DialogTypes.CONFIRM}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 my-auto px-4 sm:p-0  dark:bg-[var(--sidebar-background)] dark:text-slate-50"
        >
          <div className="flex flex-col w-full p-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-red-500">
                    are you sure ?
                </h1>
                <p className="text-slate-500 text-sm">
                    to delete the code type {code.code}
                </p>
            </div>
            <div className="mb-2">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="code"
                placeholder="B2C23425"
              />
            </div>
            <div className="flex justify-center">
              <SubmitButton
                isLoading={isLoading}
                className="bg-red-700 w-full text-slate-50 max-h-[25px] "
              >
                delete
              </SubmitButton>
            </div>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default DeleteCode;
