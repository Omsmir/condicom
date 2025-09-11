'use client';
import React from 'react';

interface SideRemainderProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const SideReminder = ({ description, title, children }: SideRemainderProps) => {
    return (
        <div className="flex flex-col bg-[var(--sidebar-background)] rounded-md shadow-md max-h-[500px] h-[495px] overflow-y-scroll">
            <div className="flex items-center justify-between border-b-[1px] border-gray-300 w-full  p-4">
                <h1 className="text-lg font-bold capitalize ">
                    {title ? title : 'Upcoming Appointments'}
                </h1>
                <p className="text-slate-500 text-sm capitalize">
                    {description ? description : '1 week further'}
                </p>
            </div>
            {children}
        </div>
    );
};

export default SideReminder;
