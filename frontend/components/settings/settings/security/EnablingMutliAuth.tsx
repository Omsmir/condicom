"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/togglers/SubmitButton";
import { ConfirmEmailChangeSchema} from "@/lib/vaildation";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useSession } from "next-auth/react";
import {  UseVerifyMultiAuthFactorEnabling } from "@/actions/mutation";
import { redirect } from "next/navigation";

const EnablingMultiAuth = () => {
  const { isTogglingMulti } = AccountHook();
  const { api } = DashboardHook();

  const { data: session } = useSession();

  const EnableMulti = UseVerifyMultiAuthFactorEnabling(api, session?.user.id);
  const [state, setState] = useState(true);
  const [valid, setValid] = useState(false);

  const form = useForm<z.infer<typeof ConfirmEmailChangeSchema>>({
    resolver: zodResolver(ConfirmEmailChangeSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ConfirmEmailChangeSchema>) => {
    const formData = new FormData();

    const data = {
      otp: values.otp,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });
    try {
        EnableMulti.mutate(formData, {
        onError: (error: any) => {
          setState(error.response.data.state);
        },
        onSuccess: async (response) => {
          setValid(response.state);

          await new Promise((resolve) => setTimeout(resolve, 1000));
          redirect("/dashboard/settings/setting");
        }
      
      });
    } catch (error: any) {
      console.log(`error from Account profile: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-8 pb-10 pt-0 w-full space-y-4"
      >
        <div className="flex mt-4">
          <h1 className="font-medium capitalize">Multi-auth factor enabling verification </h1>
        </div>
        <div className="flex flex-col mt-4 space-y-4 px-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.OTP}
            OtpLength={8}
            name="otp"
            OtpInvalid={!state || form.formState.errors.otp}
            state={valid}
          />
        </div>
        <div className="flex justify-end items-center w-full px-2">
          <SubmitButton
            className="bg-slate-800 text-slate-50 max-h-[25px] w-[170px]"
            isLoading={isTogglingMulti}
            innerText=" " // importtant
          >
            confirm otp
          </SubmitButton>
        </div>
        <div className="flex flex-col mt-4 space-y-4 px-2">
          <p className="text-xs text-slate-500">
            otp is sent to your email address. please check your email and enter
            the otp to confirm your email address.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            otp expires in 5 mins please enter the otp before it expires.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default EnablingMultiAuth;
