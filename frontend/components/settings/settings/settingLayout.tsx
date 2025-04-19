"use client";
import React from "react";
import ChangePassword from "./change/ChangePassword";
import { AccountHook } from "@/components/context/AccountProvider";
import ForgetPassword from "./forget/ForgetPassword";
import ChangeEmail from "./email/ChangeEmail";
import IntrinsicSettingLayout from "./IntrinsicSettingLayout";
import ProfilePicture from "./change/ProfilePicture";
import { Accordion } from "@/components/ui/accordion";
import Accordation from "@/components/Accordation";
import MutliAuth from "./security/MultiAuth";
import SendEmailVerification from "./email/sendEmailVerification";

const SettingLayout = () => {
  const { ResetState } = AccountHook();
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6 ">
      <IntrinsicSettingLayout title="Profile and account" classname="mb-8 ">
        <ProfilePicture />
      </IntrinsicSettingLayout>
      <IntrinsicSettingLayout title="Authentication and security">
        <Accordion type="single" collapsible className="w-full ">
          {ResetState ? (
            <ForgetPassword state={false} />
          ) : (
            <Accordation value="item-1" title="change password">
              <ChangePassword />
            </Accordation>
          )}
          <Accordation value="item-2" title="change email">
            {" "}
            <ChangeEmail />
          </Accordation>
        </Accordion>
        <MutliAuth />
     
        <SendEmailVerification />
      </IntrinsicSettingLayout>
    </div>
  );
};

export default SettingLayout;
