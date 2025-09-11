'use client';
import { inter } from '@/fonts/fonts';
import { FadeMenu, SwitchDay, SwitchMonth } from '../togglers/TopBarEvents';
import { CalenderHook } from '../context/CalenderProvider';
import dynamic from 'next/dynamic';
const AppointmentCreationButton = dynamic(() => import('@/components/AddAppointment'));

const CalenderHeader = ({ children }: { children: React.ReactNode }) => {
    const { currDate } = CalenderHook();

    return (
        <div className={`flex h-screen pt-14 ${inter.className} `}>
            <div className="flex flex-col w-full border border-l-0 border-t-0 dark:bg-[var(--sidebar-accent)] dark:border-slate-800">
                <div className="flex p-4 justify-between items-center bg-[var(--sidebar-background)] flex-col sm:flex-row ">
                    <div className="flex w-full items-center justify-start  mb-4 sm:mb-0">
                        <SwitchMonth />
                        <p className="mx-1 font-medium">{currDate.getFullYear()}</p>
                    </div>
                    <div className="flex w-full items-center justify-between sm:justify-end">
                        <div className="flex">
                            <SwitchDay />
                            <FadeMenu />
                        </div>
                        <div className="ml-8 border-l pl-4">
                            <AppointmentCreationButton patientState={false} />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CalenderHeader;
