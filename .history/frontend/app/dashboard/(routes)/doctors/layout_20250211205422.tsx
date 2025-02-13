import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health - Doctors",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return {children};
};

export default RootLayout;
