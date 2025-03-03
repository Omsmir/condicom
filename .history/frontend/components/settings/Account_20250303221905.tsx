"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";

import Contact from "./Profile/contact/Contact";
import ReusebleForm from "./Profile/ReusebleForm";
import { AccountHook } from "../context/AccountProvider";
import AccountInfo from "./Profile/AccountInfo";
import RelatedInfo from "./Profile/related/RelatedInfo";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching } = useGetUser(session?.user.id);

  const {form} = AccountHook()
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      {/* Account Information */}
      <ReusebleForm innerText="Account Info">
      <AccountInfo form={form} isFetching={isFetching} user={data?.existingUser} />
      </ReusebleForm>

      <Contact user={data?.existingUser} isFetching={isFetching} />

      <ReusebleForm innerText="Related Info">
      <RelatedInfo form={form} user={data?.existingUser} isFetching={isFetching} />
</ReusebleForm>
    </div>
  );
};

export default Account;
