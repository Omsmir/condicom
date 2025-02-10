"use client";
import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  DashboardHook,
  DashboardProvider,
} from "@/components/context/Dashboardprovider";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { NProgress } = DashboardHook();
  const queryInstance = new QueryClient({
    defaultOptions:{queries:{retry:5,retryDelay:500,refetchOnWindowFocus:false}}
  })
  NProgress.done();
  return (
    <QueryClientProvider client={queryInstance}>
    <SidebarProvider>
      <Navbar />
      <Dashboard>
        <DashboardProvider>

          {children}
        </DashboardProvider>
      </Dashboard>
    </SidebarProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
