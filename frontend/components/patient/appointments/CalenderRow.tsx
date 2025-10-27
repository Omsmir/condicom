import clsx from 'clsx';
import { format, isToday, getYear, getDayOfYear, isSameDay } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { CalenderHook } from '@/components/context/CalenderProvider';
import { Appointment } from '@/types';
import { DeleteHandler, ToggleButton } from '@/components/togglers/Handlers';
import { BulletDecorator } from './bulletDecorator';

export interface Calender {
    day: Date;
    className?: string;
    classname?: string;
    appointment: Appointment[] | undefined;
    email?: string | undefined;
}

const CalenderRow: React.FC<Calender> = ({ day, className, classname, appointment, email }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { state, setState } = CalenderHook();

    const setCurrentDay = () => {
        setState(day);
    };
    return (
        <div
            className={clsx(
                'flex flex-col border-b h-32 p-2 cursor-pointer dark:border-slate-700 transition-colors',
                {
                    'bg-slate-200 dark:bg-slate-800': isSameDay(day, state),
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
                                email === appointment.patientEmail
                            ) {
                                return (
                                    <div
                                        key={index}
                                        style={{ background: appointment.color }}
                                        className={clsx(
                                            `flex flex-col relative justify-between items-start p-2 h-16 my-1 text-sm text-slate-50 font-medium rounded-md main`,
                                            {
                                                'opacity-40 hover:opacity-40 ':
                                                    appointment.completed,
                                            }
                                        )}
                                    >
                                        <ToggleButton
                                            id={appointment._id}
                                            state={!appointment.completed}
                                        />
                                        <div className="flex mb-2">
                                            <BulletDecorator day={appointment.startDate} />
                                            <DeleteHandler
                                                id={appointment._id}
                                                apiString="appointments"
                                                messagePopup="do you want to delete the appointment"
                                                className="justify-center items-start top-0 right-0 absolute hidden text-slate-50 text-xs hover:text-red-800 transition-colors delete p-1 px-2"
                                            >
                                                x
                                            </DeleteHandler>
                                        </div>
                                        <p>
                                            {format(appointment.startDate, 'h:mm a')}{' '}
                                            {appointment.task}
                                        </p>
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
                                email === appointment.patientEmail
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
