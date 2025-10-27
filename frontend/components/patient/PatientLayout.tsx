'use client';
import React from 'react';
import { PatientHook } from '../context/PatientProvider';
import PatientInfomation from './patientInformation/PatientInfomation';
import { MotionComponent, Motions } from '../relatedComponents/Motion';
import { useSpecificPatient } from '@/actions/queries';
import Link from 'next/link';
import AppointmentLayout from './appointments/AppointmentLayout';
import MedicalLayout from './medicalHistory/MedicalLayout';

const PatientLayout = ({ id }: { id: string | undefined }) => {
    const { activeLink } = PatientHook();
    const { data, isError, error } = useSpecificPatient(id);

    const patient = data?.patient;
    if (isError) {
        return (
            <div className="flex flex-col h-screen justify-center items-center">
                <Link
                    href={'/dashboard/patients'}
                    className="text-blue-700 text-sm"
                >
                    Back to patients
                </Link>
                <h1 className="font-medium my-2">{error.message}</h1>
            </div>
        );
    }
    if (data)
        switch (activeLink) {
            case '#Patient Information':
                return (
                    <MotionComponent form={Motions.FADEIN}>
                        <PatientInfomation patient={patient} />
                    </MotionComponent>
                );
            case '#Appointments':
                return (
                        <AppointmentLayout patient={patient} />
                );
            case '#Medical History':
                return (
                    <MedicalLayout />
                )    
            default:
                return null;
        }
};

export default PatientLayout;
