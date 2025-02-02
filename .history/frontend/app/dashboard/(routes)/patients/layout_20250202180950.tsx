import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { PatientProvider } from "@/components/context/PatientProvider";
import BreadCrumb from "@/components/doctorProfile/BreadCrumb";
import { Metadata } from "next";


export const metadata:Metadata = {
  title:"Dashboard - Patients"
}
const RootLayout =  ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardProvider>
      <PatientProvider></PatientProvider>
      <main className="h-screen flex flex-col pt-14 px-4 overflow-y-scroll lg:overflow-hidden">
        {children}
      </main>
    </DashboardProvider>
  );
};

export default RootLayout;
