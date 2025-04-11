"use client";
import React from "react";
import AuthenticationandSecurityLayout from "./AuthenticationandSecurityLayout";
import AuthenticationForm from "./AuthenticationForm";
import { AccountHook } from "@/components/context/AccountProvider";
import ForgetPassword from "./ForgetPassword";

const SettingLayout = () => {
  const { ResetState } = AccountHook();
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <AuthenticationandSecurityLayout>
        {ResetState ? <ForgetPassword /> : <AuthenticationForm />}
      </AuthenticationandSecurityLayout>
    </div>
  );
};

export default SettingLayout;
