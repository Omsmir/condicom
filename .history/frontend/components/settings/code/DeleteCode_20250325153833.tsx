"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormFieldType } from '@/components/CustomFormField';
import SubmitButton from '@/components/togglers/SubmitButton';
import { useRouter } from "next/navigation";
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { AccountHook } from '@/components/context/AccountProvider';
import { userSchema } from '@/lib/vaildation';
import CustomDialog from '@/components/CustomDialog';
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
   <CustomDialog DialogTitle='delete code' DialogType={DialogTypes.con}>

   </CustomDialog>
  )
}

export default DeleteCode
