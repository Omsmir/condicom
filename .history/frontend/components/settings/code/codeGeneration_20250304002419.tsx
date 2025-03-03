"use client";
import React from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UseGenerateCode, UseUpdateUser } from "@/actions/mutation";
import { Divider } from "antd";

import { cn } from "@/lib/utils";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { useForm } from "react-hook-form";
import { CodeSchema } from "@/lib/vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import FieldEnumeration from "@/components/FieldEnumeration";
import { AccountHook } from "@/components/context/AccountProvider";

interface CodeGenerationDataProps {}
const CodeGeneration = ({}: CodeGenerationDataProps) => {
  const { api } = DashboardHook();
  const { data: session } = useSession();

  const { isLoading } = AccountHook();

  const GenerateCode = UseGenerateCode(api,session?.user.id)
  const onSubmit = (values: z.infer<typeof CodeSchema>) => {
    const formData = new FormData();

    const data = {
      numbers: values.numbers,
      characters: values.characters,
      fiveNumbers: values.fiveNumbers,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    try {
        console.log(data)

        GenerateCode.mutate()
    } catch (error: any) {
      console.log(`error from code: ${error.message}`);
    }
  };
  const form = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {},
  });

  const formItems = [
    {
      name: "numbers",
      placeHolder: "2",
      label: "First Number",
    },
    {
      name: "characters",
      placeHolder: "C",
      label: "character",
    },
    {
      name: "fiveNumbers",
      placeHolder: "5",
      label: "last Number",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      <div className="flex justify-between items-center p-4 w-full">
        <h1 className="text-lg font-semibold capitalize">code schema</h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0 w-full" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-8 pb-10 pt-0 w-full "
        >
          <div className="grid grid-cols-12">
            {formItems.map((item, index) => (
              <div
                className="col-span-4 mr-2 last-of-type:mr-0 mt-6"
                key={item.name}
              >
                <FieldEnumeration
                  form={form}
                  name={item.name}
                  label={item.label}
                  placeHolder={item.placeHolder}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center w-full mt-6">
            <SubmitButton
              className="bg-slate-800 text-slate-50 max-h-[25px]"
              isLoading={isLoading}
              innerText="generating..." // importtant
            >
              generate
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CodeGeneration;
