import React from "react";
import dynamic from "next/dynamic";

const AccountProfile = dynamic(() => import("@/components/setting"));
const page =  () => {
  return <AccountProfile />;
};

export default page;
