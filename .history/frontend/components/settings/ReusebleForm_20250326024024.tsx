"use client";
import React from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "../togglers/SubmitButton";
import { AccountSchema } from "@/lib/vaildation";
import { DashboardHook } from "../context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UseUpdateUser } from "@/actions/mutation";
import { Divider } from "antd";
import AccountReusebleHeader from "./ReusebleHeader";
import { cn } from "@/lib/utils";

interface ReusebleFormDataProps {
  children: React.ReactNode;
  innerText: string;
  className?: string;
  editState:boolean;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>
  setAnyState?: React.Dispatch<React.SetStateAction<boolean>>

}
const ReusebleForm = ({
  children,
  innerText,
  className,
  editState,
  setEditState,
  setAnyState
}: ReusebleFormDataProps) => {
  const {  isLoading, form } = AccountHook();
  const { api } = DashboardHook();
  const { data: session } = useSession();

  const updateUser = UseUpdateUser(api, session?.user.id);

  const handleEdit = () => {
    setEditState(false);
  };

  const onSubmit = (values: z.infer<typeof AccountSchema>) => {
    const formData = new FormData();

    const data = {
      name: values.name,
      occupation: values.occupation,
      gender:values.gender,
      weight:values.weight,
      height:values.height
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value as string);
      }
    });
    try {
      updateUser.mutate(formData);
    } catch (error: any) {
      console.log(`error from Account profile: ${error.message}`);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800",
        className
      )}
    >
      <AccountReusebleHeader showMenu innerText={innerText} editState={editState} setEditState={setEditState} setAnyState={setAnyState} />
      <Divider className=" dark:bg-slate-500 m-0 w-full" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-8 pb-10 pt-0 w-full "
        >
          <div className="grid grid-cols-12">{children}</div>
          {editState && (
            <div className="flex justify-end items-center w-full ">
              <Button
                className="bg-slate-100 max-h-[25px] mx-2"
                onClick={handleEdit}
              >
                cancel
              </Button>
              <SubmitButton
                className="bg-slate-800 text-slate-50 max-h-[25px]"
                isLoading={isLoading}
                innerText=" " // importtant
              >
                change
              </SubmitButton>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ReusebleForm;
