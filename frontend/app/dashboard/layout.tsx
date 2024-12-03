import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardProvider } from "@/components/context/Dashboardprovider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Navbar />
      <Dashboard>
        <DashboardProvider>{children}</DashboardProvider>
      </Dashboard>
    </SidebarProvider>
  );
}
