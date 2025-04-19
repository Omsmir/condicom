"use client";
import React from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/togglers/SubmitButton";
import { ResetPasswordSchema } from "@/lib/vaildation";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useSession } from "next-auth/react";

const MutliAuth = () => {
  const { isLoading } = AccountHook();
  const { api } = DashboardHook();

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const formData = new FormData();

    const data = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });
    try {
    } catch (error: any) {
      console.log(`error from Account profile: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-8  w-full space-y-4"
      >
       <div className="flex flex-col sm:flex-row items-center">
       <div className="flex w-full flex-col space-y-2">
          <div className="flex">
            <h1 className="font-medium capitalize">
              Multi-factor Authentication
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Enabling multi-factor authentication will add extra layer of security to your department account
          </p>
        </div>
        <div className="flex flex-col h-full w-full sm:w-fit space-y-2 mt-4 sm:mt-0">
          <SubmitButton
            className="bg-blue-800 text-slate-50 max-h-[25px] capitalize "
            isLoading={isLoading}
            innerText=" " // importtant
          >
            enable multi-factor authentication
          </SubmitButton>
          <p className="text-xs capitalize">
            multi-factor authentication is not enabled
          </p>
        </div>
       </div>
      </form>
    </Form>
  );
};

export default MutliAuth;
