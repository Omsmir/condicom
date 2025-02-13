"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import SubmitButton from "../togglers/SubmitButton";
import { PostRegisterSchema } from "@/lib/vaildation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { heigths, medicalSpecialties, weights } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import axios from "axios";
import FileUploader from "../FileUploader";
import { getSession, signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardHook } from "../context/Dashboardprovider";
import { UserInformation } from "@/types";
import { UsePostRegister } from "@/actions/mutation";

const Profile = () => {
  
  const { data: session, update } = useSession();
  const { api, contextHolder ,isLoading} = DashboardHook();

const postRegister = UsePostRegister(api)



  const onSubmit = async (values: Zod.infer<typeof PostRegisterSchema>) => {

    const formData = new FormData();

    const data = {
      profileImg: values.profileImg[0],
      occupation:values.occupation,
      weight:values.weight,
      height:values.height,
      address:values.address,
      country:values.country.label,
      bio:values.bio,
      profileState:true
     
    }

    Object.entries(data).forEach(([key,value]) => {
      if(value !== "" && value !== undefined && value !== null){
        formData.append(key,value as string)
      }
    })
  

    try {
      
    postRegister.mutate(formData,session)

    

        // const requiredData = {
        //   notification:"newUserHasJoined",
        //   user: user
        // }

           
        // await axios.post(
        //   "http://localhost:8080/api/notifications/system",
        //   {
        //     notification:"newUserHasJoined",
        //     user:user
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json", 
        //     },
        //   }

        // );
      
    } catch (error: any) {
      console.log("error",error.message)
    }
  };
  const form = useForm<Zod.infer<typeof PostRegisterSchema>>({
    resolver: zodResolver(PostRegisterSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
      {contextHolder}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/assets/icons/mark.svg"
            alt="SignIn"
            width={50}
            height={50}
          />

          <div className="my-4">
            <h1 className="text-2xl font-bold sm:text-4xl text-center capitalize">
              hello {session?.user.name || "omar"}, <br /> Welcome To Profile
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            label="Select Profile Picture"
            name="profileImg"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value}
                  onChange={field.onChange}
                  profileState
                  className="flex bg-slate-100 rounded-full size-56 cursor-pointer overflow-hidden"
                ></FileUploader>
              </FormControl>
            )}
          />
        </div>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          label="Occupation"
          name="occupation"
          placeholder="select occupation"
        >
          {medicalSpecialties.map((value, index) => (
            <SelectItem key={index} value={value.specialty}>
              <div className="flex cursor-pointer justify-center items-center">
                <p className="text-md mx-2">{value.specialty}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex overflow-hidden">
          <div className="flex-1">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              label="Weight"
              name="weight"
              placeholder="select weight"
              className="max-h-[225px]"
            >
              {weights.map((value, index) => (
                <SelectItem key={index} value={value.value}>
                  <div className="flex cursor-pointer justify-center items-center">
                    <p className="text-md mx-2">{value.value}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
          <div className="flex-1 ml-1">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              label="Height"
              name="height"
              placeholder="select height"
              className="max-h-[250px]"
            >
              {heigths.map((value, index) => (
                <SelectItem key={index} value={value}>
                  <div className="flex cursor-pointer justify-center items-center">
                    <p className="text-md mx-2">{value}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="address"
              placeholder="10 - west lebnone"
              label="Address (Optional)"
              type="text"
            />
          </div>
          <div className="flex-1 ml-1 max-w-[30%]">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.COUNTRY}
              name="country"
              label="Country"
              placeholder="select country"
            />
          </div>
        </div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          label="Biography (Optional)"
          name="bio"
          placeholder="Manages anesthesia during surgeries and pain management."
          error={form.formState.errors.bio}
        />
        <SubmitButton
          isLoading={isLoading}
          className="bg-[#6366f1] w-full text-slate-50"
        >
          continue
        </SubmitButton>
      </form>
    </Form>
  );
};

export default Profile;
