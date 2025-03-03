"use client";
import React from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UseUpdateUser } from "@/actions/mutation";
import { Divider } from "antd";

import { cn } from "@/lib/utils";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { useForm } from "react-hook-form";
import { AccountSchema } from "@/lib/vaildation";
import { zodResolver } from "@hookform/resolvers/zod";

interface CodeGenerationDataProps {

}
const CodeGeneration = ({

}: CodeGenerationDataProps) => {
  const { api } = DashboardHook();
  const { data: session } = useSession();



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
    } catch (error: any) {
      console.log(`error from code: ${error.message}`);
    }
  };
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver:zodResolver(AccountSchema),
    defaultValues:{
        name:""
    }
  })

  return (
    <div
      className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800"    >
      <div className="flex justify-between items-center p-4 w-full">
      <h1 className="text-lg font-semibold capitalize">{innerText}</h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0 w-full" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-8 pb-10 pt-0 w-full "
        >
         
        </form>
      </Form>
    </div>
  );
};

export default CodeGeneration;
