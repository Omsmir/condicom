import { PatientProvider } from '@/components/context/PatientProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Health - Doctors',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return <PatientProvider>{children}</PatientProvider>;
};

export default RootLayout;
