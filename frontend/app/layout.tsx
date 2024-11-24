import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/AuthProvider";
import AuthHolder from "@/components/AuthHolder";
import { Metadata } from "next";

import { PrimeReactProvider } from 'primereact/api';
        
import "./globals.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title:"Sign in",
  description:"Sign In To Dashboard"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${poppins.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthHolder>
            <AuthProvider>
              <PrimeReactProvider>
              {children}
              </PrimeReactProvider>
              </AuthProvider>
            </AuthHolder>
        </ThemeProvider>
      </body>
    </html>
  );
}
