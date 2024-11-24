"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Dashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="overflow-hidden flex-1 relative">{children}</main>
    </div>
  );
};

export default Dashboard;
