import { DashboardProvider } from "@/components/context/Dashboardprovider";

import { Metadata } from "next";


export const metadata:Metadata = {
    title: "Profile",
    description: "User Profile",
  };

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  
  return  (
    <DashboardProvider>
        {children}
    </DashboardProvider>
  ) ;
}


export default RootLayout;
