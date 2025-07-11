import AuthProvider from '@/components/AuthProvider';
import AuthHolder from '@/components/AuthHolder';
import { PrimeReactProvider } from 'primereact/api';
import { CalenderProvider } from '@/components/context/CalenderProvider';
import { DashboardProvider } from '@/components/context/Dashboardprovider';
import { poppins } from '@/fonts/fonts';
import QueryProvider from '@/components/QueryProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Metadata } from 'next';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Sign In To Dashboard',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`min-h-screen ${poppins.className}`}>
                <ThemeProvider>
                    <QueryProvider>
                        <AuthHolder session={session}>
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
