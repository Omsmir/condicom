'use client';
import React from 'react';
import { DashboardHook } from '../context/Dashboardprovider';

interface StatsProps {
    StatsSection: string | undefined;
    StatsIcon: React.ReactNode;
    totalDocuments:number
    selectedData: any[];
}

const Stats = ({ StatsSection, StatsIcon, totalDocuments,selectedData }: StatsProps) => {
    const { contextHolder } = DashboardHook();
    return (
        <div className="flex justify-between items-center p-2 pb-0 w-full">
            {contextHolder}
            <div className="flex items-center">
                <span className="flex justify-center items-center bg-[var(--sidebar-background)] size-10 rounded-md mr-2">
                    {StatsIcon}
                </span>
                <p className="font-medium mr-2">{totalDocuments}</p>
                <h1 className="text-slate-600 font-medium capitalize">{StatsSection}</h1>
            </div>
            <div className="flex justify-between items-center">
                <p className=" text-green-500 mr-2">{selectedData.length}</p>
                <h1 className="text-slate-600 font-medium capitalize "> {StatsSection} selected </h1>
            </div>
        </div>
    );
};

export default Stats;
