"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";

import Contact from "./Profile/contact/Contact";
import Related from "./Profile/related/Related";
import ReusebleForm from "./Profile/ReusebleForm";
import { AccountHook } from "../context/AccountProvider";
import AccountInfo from "./Profile/AccountInfo";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching } = useGetUser(session?.user.id);

  const {form} = AccountHook()
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      {/* Account Information */}
      <ReusebleForm innerText="Account Info" user={data?.existingUser} isFetching={isFetching} >
      <AccountInfo form={form} isFetching={isFetching} user={data?.existingUser} />
      </ReusebleForm>

      <Contact user={data?.existingUser} isFetching={isFetching} />

      <Related user={data?.existingUser} isFetching={isFetching} />

    </div>
  );
};

export default Account;
