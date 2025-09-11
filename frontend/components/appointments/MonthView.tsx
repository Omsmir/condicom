'use client';
import React from 'react';
import  { Calender } from '../patient/appointments/CalenderRow';
import { CalenderHook } from '@/components/context/CalenderProvider';
import { Days } from '@/lib/constants';
import clsx from 'clsx';
import { inter } from '@/fonts/fonts';
import { useMediaQuery } from 'react-responsive';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { Appointment } from '@/types';



interface MonthViewProps {
     appointments: Appointment[] | undefined;
    email?: string | undefined;
    CalenderRow:React.FC<Calender>
}

const MonthView = ({
    appointments,
    email,
    CalenderRow
}: MonthViewProps) => {
    const isMobile = useMediaQuery({ query: '(min-width: 640px)' });
    const { calendarDays, DaysOfthePrevMonth, daysOfThisMonth } = CalenderHook();

    
    return (
        <div className='flex flex-col'>
            <div className="grid grid-cols-7 border-y dark:border-slate-700">
                {Days.map((day, index) => (
                    <div
                        className={clsx(
                            `flex justify-center items-center border-r dark:border-slate-700 flex-1 last-of-type:border-r-0 ${inter.className}`
                        )}
                        key={index}
                    >
                        <p className="text-slate-600 text-[13px] font-semibold p-2 ">
                            {isMobile ? day : day.at(0)}
                        </p>
                    </div>
                ))}
            </div>
            <OverlayScrollbarsComponent defer>
                <div className="grid grid-cols-7 ">
                    {calendarDays.map((day, index) => {
                        if (
                            (
                                index >= DaysOfthePrevMonth.length &&
                                index < daysOfThisMonth.length + DaysOfthePrevMonth.length
                            )
                        ) {
                            return (
                                <CalenderRow
                                    day={day}
                                    className="border-b border-r bg-[var(--sidebar-background)] hover:bg-slate-200 dark:hover:bg-[var(--sidebar-accent)] cursor-pointer"
                                    classname="text-slate-500"
                                    key={index}
                                    appointment={appointments}
                                    email={email}
                                />
                            );
                        }
                        else {
                            return (
                                <CalenderRow
                                    day={day}
                                    className="border-r border-b hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]"
                                    key={index}
                                    appointment={appointments}
                                    email={email}
                                />
                            );
                        }
                    })}
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );
};

export default MonthView;
