import { DashboardProvider } from "@/components/context/Dashboardprovider";
import BreadCrumb from "@/components/doctorProfile/BreadCrumb";


export const metadata:Meta
const RootLayout =  ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardProvider>
      <main className="h-screen flex flex-col pt-14 px-4 overflow-y-scroll lg:overflow-hidden">
        <BreadCrumb />
        {children}
      </main>
    </DashboardProvider>
  );
};

export default RootLayout;
