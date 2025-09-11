'use client';
import { inter } from '@/fonts/fonts';
import { CalenderHook } from '@/components/context/CalenderProvider';
import { SwitchDay, SwitchMonth } from '@/components/togglers/TopBarEvents';

const CalenderHeader = ({ children }: { children: React.ReactNode }) => {
    const { currDate } = CalenderHook();

    return (
        <div className={`flex  ${inter.className} `}>
            <div className="flex flex-col w-full border border-l-0 border-t-0 dark:bg-[var(--sidebar-accent)] dark:border-slate-800">
                <div className="flex p-4 justify-between items-center bg-[var(--sidebar-background)] ">
                    <div className="flex items-center font-medium">
                        <SwitchMonth />
                        <p className="mx-1">{currDate.getFullYear()}</p>
                    </div>
                    <div className="flex">
                        <SwitchDay />                
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CalenderHeader;
