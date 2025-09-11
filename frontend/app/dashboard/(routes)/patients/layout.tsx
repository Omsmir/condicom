import { PatientProvider } from '@/components/context/PatientProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - Patients',
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
            <PatientProvider>{children}</PatientProvider>
    );
};

export default RootLayout;
