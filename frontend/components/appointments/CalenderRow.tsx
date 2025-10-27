import clsx from 'clsx';
import { format, isToday, isSameDay } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { CalenderHook } from '../context/CalenderProvider';
import { useCallback } from 'react';
import { Appointment } from '@/types';
import { useSession } from 'next-auth/react';
import PatientAppointment from './PatientAppointment';
interface Calender {
    day: Date;
    className?: string;
    classname?: string;
    appointment: Appointment[] | undefined;
}

const CalenderRow: React.FC<Calender> = ({ day, className, classname, appointment }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { data: session } = useSession();

    const {
        state,
        setState,
        setViewPort,
        setView,
        setWeekView,
        setMonthView,
        setDayView,
    } = CalenderHook();

    const WeekView = useCallback((day: Date) => {
        setState(day);

        setViewPort(2);

        setWeekView(true);
        setMonthView(false);
        setDayView(false);

        setView("Week'view");
    }, []);

    const setCurrentDay = () => {
        setState(day);
    };
    return (
        <div
            className={clsx(
                'flex flex-col border-b h-32 p-2 cursor-pointer dark:border-slate-700',
                {
                    'bg-slate-200 dark:bg-[var(--sidebar-accent)]': isSameDay(day, state),
                },
                className
            )}
            onClick={setCurrentDay}
        >
            <div className="flex justify-end md:justify-start mb-2">
                <div
                    className={clsx(
                        'flex size-7 rounded-full ',
                        {
                            'bg-blue-700 text-white items-center justify-center': isToday(day),
                        },
                        classname
                    )}
                >
                    <p className="text-[12px]">{format(day, 'd')}</p>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto">
                {!isMobile ? (
                    <div className="flex flex-col justify-between group ">
                        {appointment?.map((appointment, index) => {
                            if (
                                isSameDay(appointment.startDate, day) &&
                                session?.user.id === appointment.user
                            ) {
                                return (
                                    <div
                                        onClick={() => WeekView(day)}
                                        key={index}
                                        style={{ background: appointment.color }}
                                        className={`flex flex-col justify-center items-start px-2 py-1 my-1 text-sm text-slate-50 font-medium rounded-sm`}
                                    >
                                        {format(appointment.startDate, 'h:mm a')} {appointment.task}
                                        {appointment.patientEmail && (
                                            <PatientAppointment email={appointment.patientEmail} />
                                        )}
                                    </div>
                                );
                            }
                        })}
                    </div>
                ) : (
                    <div className="flex ">
                        {appointment?.map((appointment, index) => {
                            if (
                                isSameDay(appointment.startDate, day) &&
                                session?.user.id === appointment.user
                            ) {
                                return (
                                    <div
                                        key={index}
                                        style={{ background: appointment.color }}
                                        className={`flex justify-center items-center mx-1 text-sm text-slate-50 font-medium rounded-sm  `}
                                    >
                                        {appointment.task}
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalenderRow;
