import { AccountProvider } from '@/components/context/AccountProvider';
import SettingsLayout from '@/components/settings/SettingsLayout';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - Settings',
    description: 'User settings',
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AccountProvider>
            <SettingsLayout>{children}</SettingsLayout>
        </AccountProvider>
    );
};

export default RootLayout;
