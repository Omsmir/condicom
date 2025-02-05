import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { PatientProvider } from "@/components/context/PatientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pharmacy",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardProvider>
      <PatientProvider>{children}</PatientProvider>
    </DashboardProvider>
  );
};

export default RootLayout;
