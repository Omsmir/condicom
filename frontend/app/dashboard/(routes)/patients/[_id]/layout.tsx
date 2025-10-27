import { PatientProvider } from '@/components/context/PatientProvider';
import PatientHeader from '@/components/patient/PatientHeader';
import { Fragment } from 'react';

const RootLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ _id: string }>;
}) => {
    const id = (await params)._id;

    return (
        <Fragment>
            <PatientProvider>
                <PatientHeader id={id} />
                {children}
            </PatientProvider>
        </Fragment>
    );
};

export default RootLayout;
