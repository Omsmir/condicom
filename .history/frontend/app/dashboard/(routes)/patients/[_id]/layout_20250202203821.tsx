import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { PatientProvider } from "@/components/context/PatientProvider";
import BreadCrumb from "@/components/doctorProfile/BreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Patients",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (

      <PatientProvider>{children}</PatientProvider>
    </DashboardProvider>
  );
};

export default RootLayout;
