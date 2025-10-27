'use client';
import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardHook, DashboardProvider } from '@/components/context/Dashboardprovider';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { NProgress } = DashboardHook();

    NProgress.done();
    return (
        <SidebarProvider>
            <Navbar />
            <Dashboard>
                <DashboardProvider>{children}</DashboardProvider>
            </Dashboard>
        </SidebarProvider>
    );
}
