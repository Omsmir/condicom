"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import SubmitButton from "@/components/togglers/SubmitButton";
import { profilePictureSchema } from "@/lib/vaildation";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { AccountHook } from "@/components/context/AccountProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useSession } from "next-auth/react";
import CustomFileUploader, { FileUploaderType } from "@/components/CustomFileUploader";
import { UseChangeProfilePicture } from "@/actions/mutation";
import CustomSkeleton, { SkeletonType } from "@/components/CustomSkeleton";

const ProfilePicture = () => {
  const { isChangingPicture } = AccountHook();
  const { api } = DashboardHook();
  const [loading, setLoading] = useState(true);

  const { data: session, update } = useSession();

  const changePicture = UseChangeProfilePicture(api, session?.user?.id);

  const form = useForm<z.infer<typeof profilePictureSchema>>({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof profilePictureSchema>) => {
    const formData = new FormData();

    const data = {
      profilePicture: values.profilePicture[0],
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });
    try {
      changePicture.mutate(formData, {
        onSuccess: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await update();
        },
      });
    } catch (error: any) {
      console.log(`error from Account profile: ${error.message}`);
    }
  };
  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-8 pb-10 pt-0 w-full space-y-4"
      >
        <div className="relative flex justify-start  mt-4 space-y-4 ">
          <div className="flex justify-center items-center w-[125px] h-[125px] rounded-full overflow-hidden">
            <CustomSkeleton
              loading={loading}
              SkeletonType={SkeletonType.AVATAR}
              classname="rounded-full overflow-hidden size-28 "
              setLoading={setLoading}
              shape="circle"
              size={125}
              width={125}
              height={125}
              src={session?.user.image || "/assets/images/dr-cruz.png"}
            />
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="profilePicture"
            renderSkeleton={(field) => (
              <FormControl>
                <CustomFileUploader
                  files={field.value}
                  onChange={field.onChange}
                  type={FileUploaderType.PICTURE}
                  buttonTitle="change"
                  classname="!mt-0 absolute left-0 top-0 group"
                  buttonClassName="hidden group-hover:block group-hover:text-slate-50 transition-all"
                />
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full px-2">
          <div className="flex flex-col mt-2 space-y-1 sm:mt-0">
            <p className="text-xs text-slate-500">
              The image should be less than 2MB in size and in JPEG or PNG
              format.
            </p>
            <p className="text-xs text-slate-500">
              <span className="text-red-500">Note:</span> profile picture can be
              changed only once in 3 days.
            </p>
          </div>
          <SubmitButton
            className="bg-slate-800 text-slate-50 max-h-[25px] w-full sm:w-[160px]"
            isLoading={isChangingPicture}
            innerText=" " // importtant
          >
            change picture
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default ProfilePicture;
