"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";

import AccountInfoHolder from "./Profile/AccountInfoHolder";
import Contact from "./Profile/contact/Contact";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching } = useGetUser(session?.user.id);

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      {/* Account Information */}
      <AccountInfoHolder user={data?.existingUser} isFetching={isFetching} />

      <Contact user={data?.existingUser} isFetching={isFetching} />

      <Contact user={data?.existingUser} isFetching={isFetching} />

    </div>
  );
};

export default Account;
