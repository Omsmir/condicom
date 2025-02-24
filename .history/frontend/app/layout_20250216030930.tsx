"use client";
import AuthProvider from "@/components/AuthProvider";
import AuthHolder from "@/components/AuthHolder";
import { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "./globals.css";
import { CalenderProvider } from "@/components/context/CalenderProvider";
import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { poppins } from "@/fonts/fonts";
import QueryProvider from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const {resolvedTheme} = useTheme()
  return (
    <html lang="en" >
      <body className={`min-h-screen ${poppins.className}`} data-theme={}>
        <ThemeProvider>
          <QueryProvider>
            <AuthHolder>
              <AuthProvider>
                <PrimeReactProvider>
                  <CalenderProvider>
                    <DashboardProvider>{children}</DashboardProvider>
                  </CalenderProvider>
                </PrimeReactProvider>
              </AuthProvider>
            </AuthHolder>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
