import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "900"],
  subsets: ["latin"],
});

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
      <Dashboard>{children}</Dashboard>
    </SidebarProvider>
  );
}
