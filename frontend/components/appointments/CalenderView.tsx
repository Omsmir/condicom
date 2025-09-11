'use client';
import { CalenderHook } from '../context/CalenderProvider';
import React from 'react';
import WeekView from './WeekView';
import MonthView from './MonthView';
import DayView from './DayView';
import { Queries } from '@/actions/queries';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';
import CalenderRow from './CalenderRow';
import { MotionComponent, Motions } from '../relatedComponents/Motion';

const Calender = () => {
    const { viewPort } = CalenderHook();

    const { data: session } = useSession();
    const { data, isLoading } = Queries.UseUserAppointments(session?.user.id);
    if (isLoading) return <Loading />;

    switch (viewPort) {
        case 1:
            return (
                <MotionComponent form={Motions.FADEIN}>
                <MonthView
                    CalenderRow={CalenderRow}
                    appointments={data?.userAppointments}
                />
                </MotionComponent>
            );
        case 2:
            return <WeekView appointments={data?.userAppointments} />;
        case 3:
            return <DayView appointments={data?.userAppointments} />;
        default:
            return null;
    }
};

export default Calender;
