'use client';

import { Appointment } from '@/types';
import clsx from 'clsx';
import { isSameDay, format } from 'date-fns';
import React from 'react';
import { DeleteHandler, ToggleButton } from '../togglers/Handlers';
import { CalenderHook } from '../context/CalenderProvider';
import { useMediaQuery } from 'react-responsive';
import PatientAppointment from './PatientAppointment';

const WeekViewRows = ({ appointment }: { appointment: Appointment[] | undefined }) => {
    const isMobile = useMediaQuery({ query: '(min-width: 640px)' });

    const { DaysOfWeekCalender, DaysOfWeekCalenderForMobileView, theMinutes } = CalenderHook();

    const DaysToMapThrough = () => {
        if (isMobile) {
            return DaysOfWeekCalender;
        } else {
            return DaysOfWeekCalenderForMobileView;
        }
    };
    return (
        <React.Fragment>
            {DaysToMapThrough().map((day, index) => (
                <div
                    className="grid border-r pt-2 dark:border-slate-700 "
                    key={index}
                >
                    {theMinutes.map((hour, hourIndex) => {
                        // Filter appointments for the specific day and hour
                        const filteredAppointments = appointment?.filter(appointment => {
                            if (
                                isSameDay(appointment.startDate, day) &&
                                format(appointment.startDate, 'h:mm a') === format(hour, 'h:mm a')
                            ) {
                                return appointment;
                            }
                        });

                        return (
                            <div
                                className="flex justify-center cursor-pointer border-b h-20 relative dark:border-slate-700 hover:bg-slate-200  dark:hover:bg-[var(--sidebar-accent)]"
                                key={hourIndex}
                            >
                                {filteredAppointments &&
                                    filteredAppointments.length > 0 &&
                                    filteredAppointments.map((appointment, appointmentIndex) => (
                                        <div
                                            key={appointmentIndex} // Ensure unique key for each appointment
                                            style={{
                                                height: `${appointment.interval}%`,
                                                backgroundColor: appointment.color,
                                            }}
                                            className={clsx(
                                                `flex  w-[95%] rounded-md cursor-pointer z-10 hover:opacity-85 relative overflow-hidden main`,
                                                { 'opacity-40 hover:opacity-40 ': appointment.completed }
                                            )}
                                        >
                                            <ToggleButton
                                                id={appointment._id}
                                                state={!appointment.completed}
                                            />
                                            <div className="flex flex-col items-start text-slate-50 p-3 ">
                                                <p className="font-medium text-[13px]">
                                                    {format(appointment.startDate, 'h:mm a')}
                                                </p>

                                                <p className="font-medium text-sm">{appointment.task}</p>
                                                <p className="text-[12px] text-slate-400">
                                                    {appointment.description}
                                                </p>

                                                {appointment.patientEmail && (
                                                    <PatientAppointment email={appointment.patientEmail} />
                                                )}
                                            </div>
                                            <DeleteHandler
                                                id={appointment._id}
                                                apiString="appointments"
                                                messagePopup="do you want to delete the appointment"
                                                className="absolute text-slate-50 right-0 hidden hover:text-red-800 transition-colors delete"
                                            >
                                                x
                                            </DeleteHandler>
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            ))}
        </React.Fragment>
    );
};

export default WeekViewRows;
