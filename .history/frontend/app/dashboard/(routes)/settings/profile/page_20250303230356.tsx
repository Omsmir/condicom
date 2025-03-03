import React from "react";
import dynamic from "next/dynamic";

const AccountProfile = dynamic(() => import("@/components/settings/Profile/"));
const page =  () => {
  return <AccountProfile />;
};

export default page;
