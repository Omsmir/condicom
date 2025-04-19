import { AccountProvider } from "@/components/context/AccountProvider";
import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { Metadata } from "next";
import React from "react";
export const metadata:Metadata = {
  title: "Reset Password",
  description: "Reset Password",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardProvider>
      <AccountProvider>{children}</AccountProvider>
    </DashboardProvider>
  );
};

export default layout;
