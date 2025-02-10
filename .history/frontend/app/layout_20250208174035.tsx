import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/AuthProvider";
import AuthHolder from "@/components/AuthHolder";
import { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import "./globals.css";
import { CalenderProvider } from "@/components/context/CalenderProvider";
import { DashboardProvider } from "@/components/context/Dashboardprovider";
import { poppins } from "@/fonts/fonts";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign In To Dashboard",
  icons:{
    
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryInstance = new QueryClient({
    defaultOptions:{queries:{retry:5,retryDelay:500,refetchOnWindowFocus:false}}
  })
  return (
    <html lang="en">
      <body className={`min-h-screen ${poppins.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthHolder>
            <AuthProvider>
              <PrimeReactProvider>
              <QueryClientProvider client={q}>
                <CalenderProvider>
                  <DashboardProvider>
                    {children}
                  </DashboardProvider>
                </CalenderProvider>
                </QueryClientProvider>
              </PrimeReactProvider>
            </AuthProvider>
          </AuthHolder>
        </ThemeProvider>
      </body>
    </html>
  );
}
