'use client';

import AppSidebar from '@/components/AppSidebar';

const Dashboard = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="relative bg-slate-50  dark:bg-[var(--sidebar-accent)] w-full h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default Dashboard;
