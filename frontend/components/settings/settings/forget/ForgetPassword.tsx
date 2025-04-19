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
import { UseSendVerificationCode } from "@/actions/mutation";
import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";

const ForgetPassword = ({ state }: { state: boolean }) => {
  const { isLoading, setResetState } = AccountHook();
  const { api } = DashboardHook();

  const {data:session} = useSession()
  const SendVerificationEmail = UseSendVerificationCode(api);

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
      id:session?.user.id || undefined,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });
    try {
      console.log("formData", formData);
      SendVerificationEmail.mutate(formData, {
        onSuccess: async () => {
          form.reset();
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
        className="flex flex-col p-8 pb-10 pt-0 w-full space-y-4"
      >
        <div className={clsx("flex items-center mt-4",{"justify-center":state})}>
          {!state && <h1 className="font-medium mr-1">Reset Password</h1>}
          <p className="text-slate-600 text-sm italic ">
            note* please write the email you have registerd with
          </p>
        </div>
        <div className="flex flex-col mt-4 space-y-4 px-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="current email"
            name="email"
            error={form.formState.errors.email}
            state
          />
        </div>
        <div className="flex justify-between items-center w-full px-2">
          <SubmitButton
            className="bg-slate-800 text-slate-50 max-h-[25px]"
            isLoading={isLoading}
            innerText=" " // importtant
          >
            send mail
          </SubmitButton>
          {state ? (
            <Link href={"/"} className="mt-2">
              <p className="text-sky-700 text-sm hover:underline">
                return to login
              </p>
            </Link>
          ) : (
            <Button
              className="text-slate-600"
              variant="link"
              onClick={() => setResetState(false)}
            >
              return
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ForgetPassword;
