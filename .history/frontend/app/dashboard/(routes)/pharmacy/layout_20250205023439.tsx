import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pharmacy",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardProvider>{children}</DashboardProvider>;
};

export default RootLayout;
