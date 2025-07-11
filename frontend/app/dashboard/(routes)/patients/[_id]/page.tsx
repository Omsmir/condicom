import PatientLayout from '@/components/patient/PatientLayout';
import React from 'react';

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
    const id = (await params)._id;

    return <PatientLayout id={id} />;
};

export default page;
