"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/togglers/SubmitButton";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { UseToggleMultiAuthFactor } from "@/actions/mutation";
import { redirect } from "next/navigation";
import clsx from "clsx";

const MutliAuth = () => {
  const { isTogglingMulti } = AccountHook();
  const { api } = DashboardHook();

  const { data: session, update } = useSession();

  const toggleMulti = UseToggleMultiAuthFactor(api, session?.user.id);

  const form = useForm();

  const onSubmit = async () => {
    const formData = new FormData();

    try {
      await toggleMulti.mutateAsync(formData, {
        onSuccess: async (response) => {
          if (session?.user.mfa_state) {
            await new Promise((res) => setTimeout(res, 1500));

            await update();
          } else {
            await new Promise((res) => setTimeout(res, 1500));
            redirect(
              `/dashboard/settings/setting/verify/${response.data.token}`
            );
          }
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
              Enabling multi-factor authentication will add extra layer of
              security to your department account
            </p>
          </div>
          <div className="flex flex-col h-full w-full sm:w-fit space-y-2 mt-4 sm:mt-0">
            <SubmitButton
              className={clsx(
                "bg-blue-800 text-slate-50 max-h-[25px] capitalize",
                { "bg-red-700": session?.user.mfa_state }
              )}
              isLoading={isTogglingMulti}
              disabledText="multi-auth is enabled"
              innerText=" " // importtant
            >
              {session?.user.mfa_state
                ? "disable multi-auth"
                : "enable multi-auth"}
            </SubmitButton>

            <div className="flex items-center text-xs capitalize whitespace-nowrap">
              multi-factor authentication is{" "}
              <p
                className={`ml-1 text-xs ${
                  session?.user.mfa_state ? "text-green-800" : "text-red-800"
                }`}
              >
                {session?.user.mfa_state ? "enabled" : "not enabled"}
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MutliAuth;
