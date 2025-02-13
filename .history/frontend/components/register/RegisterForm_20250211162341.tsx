"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { User, KeyRound, EyeOff, Eye, Key } from "lucide-react";
import SubmitButton from "../togglers/SubmitButton";
import { RegisterSchema } from "@/lib/vaildation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gender, genders } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import Link from "next/link";
import { QrcodeOutlined } from "@ant-design/icons";
import axios from "axios";
import { signIn } from "next-auth/react";
import { DashboardHook } from "../context/Dashboardprovider";
import { useLogin, UseRegister } from "@/actions/mutation";
const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<boolean>(false);
  const { api, contextHolder } = DashboardHook();


  const register = UseRegister(api)
  const login = useLogin(api)
  const onSubmit = async (values: Yup.InferType<typeof RegisterSchema>) => {
    setIsLoading(true);

    const formData = new FormData();

    const data = {
     email:values.email,
     password:values.password,
     confirmPassword:values.confirmPassword,
     name:values.name,
     gender:values.gender,
     birthDate:values.birthDate,
     phone:values.phone,
     code:values.code
    
    }


    Object.entries(data).forEach(([key,value]) => {
      if(value !== "" && value !== undefined && value !== null){
        formData.append(key,value as string)
      }
    })

    
    console.log(formData);

    try {
      const response = await register.mutateAsync(formData)

      if (response.status === 201) {
    

        const email = values.email;
        const password = values.password;

        const result = await login.mutateAsync({email,password})
  
        router.push("/register/profile");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          api.error({
            message: `${error.response.data.msg}`,
            description: "something went wrong",
            showProgress: true,
            pauseOnHover: false,
          });
        } else {
          api.error({
            message: "No Response from Server",
            description: "something went wrong",
            showProgress: true,
            pauseOnHover: false,
          });
        }
      } else if (error instanceof Error) {
        api.error({
          message: "Unexpected Error",
          description: "An unexpected error occurred.",
        });
      } else {
        api.error({
          message: "Error: Unknown Error",
          description: "An unexpected error occurred.",
        });
      }
    }

    setIsLoading(false);
  };
  const form = useForm<Yup.InferType<typeof RegisterSchema>>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
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
            <h1 className="text-2xl font-bold sm:text-4xl text-center">
              Welcome To Dashboard
            </h1>
          </div>
        </div>
        <CustomFormField
          control={form.control}
          Lucide={<User className="dark:text-dark-600" />}
          placeholder="username"
          label="Username"
          fieldType={FormFieldType.INPUT}
          name="name"
          error={form.formState.errors.name}
          state
        />
        <CustomFormField
          control={form.control}
          Lucide={<User className="dark:text-dark-600" />}
          placeholder="enter your email"
          label="Email address"
          fieldType={FormFieldType.INPUT}
          name="email"
          error={form.formState.errors.email}
          state
        />

        <CustomFormField
          control={form.control}
          Lucide={<KeyRound className="dark:text-dark-600" />}
          placeholder="enter password"
          label="Password"
          fieldType={FormFieldType.PASSWORD}
          type={state ? "text" : "password"}
          error={form.formState.errors.password}
          children={
            <>
              {state ? (
                <Eye
                  onClick={() => setState(false)}
                  size="20px"
                  cursor="pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setState(true)}
                  size="20px"
                  cursor="pointer"
                />
              )}
            </>
          }
          name="password"
        />

        <CustomFormField
          control={form.control}
          Lucide={<KeyRound className="dark:text-dark-600" />}
          placeholder="confirm password"
          label="Confirm password"
          fieldType={FormFieldType.PASSWORD}
          type={state ? "text" : "password"}
          error={form.formState.errors.confirmPassword}
          children={
            <>
              {state ? (
                <Eye
                  onClick={() => setState(false)}
                  size="20px"
                  cursor="pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setState(true)}
                  size="20px"
                  cursor="pointer"
                />
              )}
            </>
          }
          name="confirmPassword"
        />
        <div className="flex overflow-hidden">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            label="Gender"
            name="gender"
            placeholder="select a gender"
          >
            {genders.map((value, index) => (
              <SelectItem
                key={index}
                value={value}
                className="cursor-pointer transition-colors hover:bg-slate-200 "
              >
                <div className="flex justify-center items-center">
                  <p className="text-md text-black mx-2">{value}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE}
            label="Birthday"
            name="birthDate"
            className="ml-1"
          />
        </div>
        <div className="flex">
          <div className="w-[70%]">
            <CustomFormField
              fieldType={FormFieldType.PHONE}
              control={form.control}
              label="Enter Your Phone"
              name="phone"
              placeholder="(+20) 10-1261-5424"
            />
          </div>
          <div className="ml-1 w-[30%]">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="code"
              placeholder="B123C12D"
              type="text"
              label="Code"
              Lucide={<QrcodeOutlined />}
              state
              error={form.formState.errors.code}
            />
          </div>
        </div>
        <SubmitButton
          isLoading={isLoading}
          className="bg-[#6366f1] w-full text-slate-50"
        >
          Register
        </SubmitButton>
        <div className="flex justify-between">
          <p className="text-sm text-slate-500">have account?</p>
          <Link href={"/"}>
            <p className="text-sky-700 text-sm hover:underline">
              return to login
            </p>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
