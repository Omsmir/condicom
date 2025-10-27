import { CalenderProvider } from '@/components/context/CalenderProvider';
import CalenderHeader from '@/components/appointments/CalenderHeader';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Health - Appointments',
    description: 'Welcome to dashboard',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CalenderProvider>
            <CalenderHeader>{children}</CalenderHeader>
        </CalenderProvider>
    );
}
