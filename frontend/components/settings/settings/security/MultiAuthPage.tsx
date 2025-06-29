"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/togglers/SubmitButton";
import { VerifyOtp } from "@/lib/vaildation";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useSession } from "next-auth/react";
import { UseVerifyMultiAuthOtp } from "@/actions/mutation";
import { redirect } from "next/navigation";
import Image from "next/image";

const MultiAuthPage = () => {
  const { isTogglingMulti } = AccountHook();
  const { api } = DashboardHook();

  const { data: session, update } = useSession();

  const EnableMulti = UseVerifyMultiAuthOtp(api, session?.user.id);
  const [state, setState] = useState(true);
  const [valid, setValid] = useState(false);

  const form = useForm<z.infer<typeof VerifyOtp>>({
    resolver: zodResolver(VerifyOtp),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof VerifyOtp>) => {
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

          await update();
          
          redirect("/dashboard");
        },
      });
    } catch (error: any) {
      console.log(`error from Account profile: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:p-8 md:pb-10 pt-0 w-full space-y-4"
      >
        <div className="flex flex-col justify-center items-center mt-4">
          <Image
            src="/assets/icons/mark.svg"
            alt="SignIn"
            width={50}
            height={50}
          />
          <h1 className="font-medium text-lg capitalize mt-2">
            Multi-auth verification{" "}
          </h1>
        </div>
        <div className="flex flex-col mt-4 space-y-4 px-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.OTP}
            OtpLength={8}
            name="otp"
            OtpInvalid={!state || form.formState.errors.otp}
            state={valid}
            otpForm="bar"
          />
        </div>
        <div className="flex justify-center items-center w-full px-2">
          <SubmitButton
            className="bg-slate-800 text-slate-50 max-h-[25px] w-[80%] "
            isLoading={isTogglingMulti}
            innerText=" " // importtant
          >
            verify otp
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

export default MultiAuthPage;
