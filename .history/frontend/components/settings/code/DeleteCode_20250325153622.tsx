"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormFieldType } from '@/components/CustomFormField';
import { User, KeyRound, EyeOff, Eye } from "lucide-react";
import SubmitButton from '@/components/togglers/SubmitButton';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { AccountHook } from '@/components/context/AccountProvider';
import { userSchema } from '@/lib/vaildation';
const DeleteCode = () => {

    const {isLoading,setIsLoading} = AccountHook()
      
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
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 my-auto px-4 sm:p-0 sm:mx-4"
    >
      <div className="flex flex-col justify-center items-center">

        <div className="my-4">
          <h1 className="text-2xl font-bold sm:text-4xl text-center">
            Sign In To Dashboard
          </h1>
        </div>
      </div>
   
    

      <SubmitButton
        isLoading={isLoading}
        className="bg-[#6366f1] w-full text-slate-50"
      >
        Sign in
      </SubmitButton>

      <div className="flex justify-between">
        <p className="text-sm text-slate-500">doesn't have account?</p>
        <Link href={"/register"}>
          <p className="text-sky-700 text-sm hover:underline">create one</p>
        </Link>
      </div>
    </form>
  </Form>
  )
}

export default DeleteCode
