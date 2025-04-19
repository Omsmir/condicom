"use client";
import React from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/togglers/SubmitButton";
import { ResetPasswordSchema } from "@/lib/vaildation";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useSession } from "next-auth/react";

import { UseChangeEmail } from "@/actions/mutation";
import { redirect } from "next/navigation";


const ChangeEmail = () => {
  const { isChangingEmail } = AccountHook();
  const { api } = DashboardHook();

  const { data: session } = useSession();

  const changeEmail = UseChangeEmail(api, session?.user.id);
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const formData = new FormData();

    const data = {
      email: values.email,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });
    try {
      changeEmail.mutate(formData, {
        onSuccess: async (response) => {
          redirect(`/dashboard/settings/setting/otp/${response.token}`);
        },
      });
    } catch (error: any) {
      console.log(`error from Account setting: ${error.message}`);
    }
  };

  return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full space-y-4"
            >
              <div className="flex flex-col mt-4 space-y-4 px-2">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="new email"
                  name="email"
                  error={form.formState.errors.email}
                  state
                />
              </div>
              <div className="flex justify-end items-center w-full px-2">
                <SubmitButton
                  className="bg-slate-800 text-slate-50 w-full max-h-[25px] sm:w-[160px]"
                  isLoading={isChangingEmail}
                  innerText=" " // importtant
                >
                  send verification email
                </SubmitButton>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full px-2 space-y-1 sm:space-y-0">
                <p className="text-xs text-slate-500">
                  A verification email will be sent to your new email address.
                </p>
                <p className="text-xs text-slate-500">
                  email can be changed only once in 30 days.
                </p>
              </div>
            </form>
          </Form>

  );
};

export default ChangeEmail;
