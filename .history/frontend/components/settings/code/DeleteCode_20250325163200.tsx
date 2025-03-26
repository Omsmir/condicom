"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/togglers/SubmitButton";
import { AccountHook } from "@/components/context/AccountProvider";
import { userSchema } from "@/lib/vaildation";
import CustomDialog, { DialogTypes } from "@/components/CustomDialog";

const DeleteCode = () => {
  const { isLoading, setIsLoading } = AccountHook();

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const email = values.email;
    const password = values.password;

    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
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
            <div className="flex justify-center items-center">
                <p className="text-slate-500">
                    are you sure?
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
                isLoading={true}
                className="bg-[#6366f1] w-full text-slate-50 max-h-[25px] "
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
