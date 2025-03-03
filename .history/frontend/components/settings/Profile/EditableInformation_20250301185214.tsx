"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import {AccountSchema} from "@/lib/vaildation";
import { DashboardHook } from '../../context/Dashboardprovider';

export const form = useForm<z.infer<typeof AccountSchema>>({
  resolver: zodResolver(AccountSchema),
  defaultValues: {
    name:  "",
    
  },
});
const EditableInformation = ({children}:{children:React.ReactNode}) => {

    const {isLoading} = DashboardHook()

    const onSubmit = (values:z.infer<typeof AccountSchema>) => {

    }
 
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-12 p-8 pb-10 pt-0 w-full "
    >
   
      {children}
    </form>
  </Form>
  )
}

export default EditableInformation
