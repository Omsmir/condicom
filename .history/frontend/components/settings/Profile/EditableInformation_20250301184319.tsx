"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import {AccountSchema} from "@/lib/vaildation";
import { DashboardHook } from '../../context/Dashboardprovider';

const EditableInformation = () => {

    const {isLoading} = DashboardHook()

    const onSubmit = (values:z.infer<typeof AccountSchema>) => {

    }
    const form = useForm<z.infer<typeof AccountSchema>>({
        resolver: zodResolver(AccountSchema),
        defaultValues: {
          name:  "",
          
        },
      });
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
   
      {chilren}
    </form>
  </Form>
  )
}

export default EditableInformation
