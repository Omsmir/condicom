'use client';
import React from 'react';
import CalenderHeader from './CalenderHeader';
import { MotionComponent, Motions } from '@/components/relatedComponents/Motion';
import { patient } from '@/types';
import { Queries } from '@/actions/queries';
import MonthView from '@/components/appointments/MonthView';
import CalenderRow from './CalenderRow';

const AppointmentLayout =  ({ patient }: { patient: patient | undefined }) => {
    const { data } = Queries.UseGetPatientAppointments(patient?.email);

    return (
        <CalenderHeader>
            <MotionComponent form={Motions.FADEIN}>
                <MonthView CalenderRow={CalenderRow} appointments={data?.appointments} email={patient?.email} />
            </MotionComponent>
        </CalenderHeader>
    );
};

export default AppointmentLayout;
