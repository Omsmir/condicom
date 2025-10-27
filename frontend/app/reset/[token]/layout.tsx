import { AccountProvider } from '@/components/context/AccountProvider';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
    return <AccountProvider>{children}</AccountProvider>;
};

export default layout;
