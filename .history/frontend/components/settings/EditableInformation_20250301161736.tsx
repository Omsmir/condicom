"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from '../CustomFormField';
import { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { User, DollarSign } from "lucide-react";
import SubmitButton from "../togglers/SubmitButton";
import { formSchema } from "@/lib/vaildation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { DashboardHook } from '../context/Dashboardprovider';

const EditableInformation = () => {

    const {isLoading} = DashboardHook()

    const onSubmit = () => {

    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:  "",
          description: "",
          price:1,
          
        },
      });
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-1 space-y-8 my-auto dark:bg-[var(--sidebar-background)] p-4 rounded-md"
    >
      <section className="grid grid-cols-12">
        <div className="mr-2 col-span-6 sm:col-span-8">
          <CustomFormField
            control={form.control}
            Lucide={<User className="dark:text-dark-600" />}
            placeholder="product name"
            label="product name"
            fieldType={FormFieldType.INPUT}
            name="name"
          />
        </div>
        <div className="col-span-6 sm:col-span-4 ">
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            control={form.control}
            placeholder="50$"
            label="price"
            name="price"
            Lucide={<DollarSign className="dark:text-slate-600" />}
            min={1}
            max={999}
          />
        </div>
      </section>
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="description"
        placeholder="product description"
        label="description"
      />

      <SubmitButton isLoading={isLoading}>Add Product</SubmitButton>
    </form>
  </Form>
  )
}

export default EditableInformation
