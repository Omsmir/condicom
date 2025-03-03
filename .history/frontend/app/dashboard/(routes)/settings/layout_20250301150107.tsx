import { DashboardProvider } from "@/components/context/Dashboardprovider";
import SettingsLayout from "@/components/settings/SettingsLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - settings",
  description: "User settings",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardProvider>
      <SettingsLayout>{children}</SettingsLayout>
    </DashboardProvider>
  );
};

export default RootLayout;
