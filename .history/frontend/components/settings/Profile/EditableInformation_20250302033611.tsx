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

interface EditableInformationDataProps {
  user: UserInformation | undefined;
  isFetching: boolean;
}
const EditableInformation = ({
  user,
  isFetching,
}: EditableInformationDataProps) => {
  const { ProfileEdit, setProfileEdit } = AccountHook();
  const onSubmit = (values: z.infer<typeof AccountSchema>) => {
    try {
      console.log("clicked");
    } catch (error) {}
  };

  const { data: session } = useSession();
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
        className="grid grid-cols-12 p-8 pb-10 pt-0 w-full "
      >
        <AccountInfo form={form} isFetching={isFetching} user={user} />
        <SubmitButton
          className="bg-slate-800 text-slate-50 max-h-[25px]"
          innerText=" "
        >
          change
        </SubmitButton>
      </form>
    </Form>
  );
};

export default EditableInformation;
