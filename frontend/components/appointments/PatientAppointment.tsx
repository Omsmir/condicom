'use client';
import { Queries, UseGetPatient } from '@/actions/queries';
import Link from 'next/link';
import React from 'react';
const PatientAppointment = ({ email }: { email: string | undefined }) => {
    const { data } = UseGetPatient(email);

    const name = `${data?.patient.firstName} ${data?.patient.lastName}`;

    if (data)
        return (
            <Link
                href={`/dashboard/patients/${data.patient.id}`}
                className="z-50 text-sm text-slate-500 hover:underline hover:text-slate-50 transition-colors"
            >
                A.T: {name}
            </Link>
        );
};

export default PatientAppointment;
