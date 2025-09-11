'use client';
import { Appointment } from '@/types';
import clsx from 'clsx';
import { isSameDay, format } from 'date-fns';
import React from 'react';
import { DeleteHandler, ToggleButton } from '../togglers/Handlers';
import { CalenderHook } from '../context/CalenderProvider';
import PatientAppointment from './PatientAppointment';

const DayViewRows = ({ appointments }: { appointments: Appointment[] | undefined }) => {
    const { DaysOfWeekCalenderForMobileView, theMinutes } = CalenderHook();

    return (
        <div className="grid grid-cols-1 border-l col-span-10 dark:border-slate-700 ">
            {DaysOfWeekCalenderForMobileView.map((day, index) => (
                <div
                    className="grid border-r py-4 dark:border-slate-700"
                    key={index}
                >
                    {theMinutes.map((halfHour, halfIndex) => {
                        const filteredAppointments = appointments?.filter(appointment => {
                            if (
                                isSameDay(appointment.startDate, day) &&
                                format(appointment.startDate, 'h:mm a') == format(halfHour, 'h:mm a')
                            ) {
                                return appointment;
                            }
                        });
                        return (
                            <div
                                className="flex justify-center border-b h-20 relative dark:border-slate-700 "
                                key={halfIndex}
                            >
                                {filteredAppointments?.map((appointment, index) => (
                                    <div
                                        key={index} // Ensure unique key for each appointment
                                        style={{
                                            height: `${appointment.interval}%`,
                                            backgroundColor: appointment.color,
                                        }}
                                        className={clsx(
                                            `flex w-[98%] rounded-md cursor-pointer z-10 hover:opacity-85 relative main`,
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
        </div>
    );
};

export default DayViewRows;
