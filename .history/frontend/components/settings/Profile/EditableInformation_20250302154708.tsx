"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "../../togglers/SubmitButton";
import { AccountSchema } from "@/lib/vaildation";
import { DashboardHook } from "../../context/Dashboardprovider";
import SingleInformationRow from "@/components/patient/SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { medicalSpecialties } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import { AccountHook } from "@/components/context/AccountProvider";
import { UserInformation } from "@/types";
import { format } from "date-fns";
import AccountInfo from "./AccountInfo";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UseUpdateUser } from "@/actions/mutation";

interface EditableInformationDataProps {
  user: UserInformation | undefined;
  isFetching: boolean;
}
const EditableInformation = ({
  user,
  isFetching,
}: EditableInformationDataProps) => {
  const { ProfileEdit, setProfileEdit ,isLoading} = AccountHook();
  const {api} = 
  const { data: session } = useSession();

  const updateUser = UseUpdateUser()
  const handleEdit = () => {
    setProfileEdit(false);
  };

  const onSubmit = (values: z.infer<typeof AccountSchema>) => {
    const formData = new FormData();

    const data = {
      name: values.name,
      occupation: values.occuaption,
    };

    Object.entries(data).forEach(([key,value]) => {
      if(value !== undefined && value !== null && value !== ""){
        formData.append(key,value as string)
      }
    })
    try {
      
    } catch (error:any) {
      console.log(`error from Account profile: ${error.message}`)
    }
  };

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: session?.user.name as string,
      occuaption: user?.occupation,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-8 pb-10 pt-0 w-full "
      >
        <div className="grid grid-cols-12">
          <AccountInfo form={form} isFetching={isFetching} user={user} />
        </div>
        {ProfileEdit && (
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
            >
              change
            </SubmitButton>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EditableInformation;
