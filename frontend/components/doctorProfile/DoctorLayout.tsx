'use client';
import Patients from './Patients';
import DoctorInformation from './DoctorInformation';
import React from 'react';
import DoctorAppointments from './DoctorAppointments';
import Prescriptions from './Prescriptions';

const DoctorLayout = ({ id }: { id: string | undefined }) => {
    return (
        <React.Fragment>
            {/* Doctor Information Section */}
            <DoctorInformation id={id} />
            <section className="flex flex-col lg:flex-row h-screen">
                <section className="flex flex-col flex-1 lg:flex-grow-0 mb-4 sm:mb-0  sm:mr-4">
                    <Patients />
                    <Prescriptions />
                </section>
                <section className="flex flex-1 sm:mt-4">
                    <DoctorAppointments id={id} />
                </section>
            </section>
        </React.Fragment>
    );
};

export default DoctorLayout;
