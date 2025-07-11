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
            <main className="overflow-hidden flex-1 relative bg-slate-50  dark:bg-[var(--sidebar-accent)] ">
                {children}
            </main>
        </div>
    );
};

export default Dashboard;
