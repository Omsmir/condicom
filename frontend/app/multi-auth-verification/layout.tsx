import { AccountProvider } from "@/components/context/AccountProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Multi Auth Verification",
  description: "Multi Auth Verification Page",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default layout;
