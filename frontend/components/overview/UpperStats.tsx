'use client';
import { inter } from '@/fonts/fonts';
import React from 'react';

const UpperStats = () => {
    return (
        <div className={`grid col-span-12 grid-cols-12  gap-2 p-4 ${inter.className}`}>
            <div className="flex flex-col items-start justify-center p-4 bg-[var(--sidebar-background)]  rounded-md shadow-md space-y-2 col-span-6 lg:col-span-4">
                <h2 className="text-lg font-semibold capitalize">Patients metrics</h2>
                <p className="font-medium text-sm">150</p>
                <span className='flex flex-row justify-center items-start'>
                    <h6 className='text-sm text-slate-500'>last 30days:</h6>
                    <p className='ms-1 text-sm font-medium text-green-700'>%30</p>
                </span>
            </div>
            <div className="flex flex-col items-start justify-center p-4 bg-[var(--sidebar-background)] rounded-md shadow-md space-y-2   col-span-6 lg:col-span-4">
                <h2 className="text-lg font-semibold capitalize">Appointments metrics</h2>
                <p className="font-medium text-sm">25</p>
                  <span className='flex flex-row justify-center items-start'>
                    <h6 className='text-sm text-slate-500'>last 30days:</h6>
                    <p className='ms-1 text-sm font-medium text-red-700'>%30</p>
                </span>
            </div>
            <div className="flex flex-col items-start justify-center p-4 bg-[var(--sidebar-background)] rounded-md shadow-md space-y-2 col-span-12 lg:col-span-4">
                <h2 className="text-lg font-semibold capitalize">Doctors Metrics</h2>
                <p className="font-medium text-sm">5</p>
                  <span className='flex flex-row justify-center items-start'>
                    <h6 className='text-sm text-slate-500'>last 30days:</h6>
                    <p className='ms-1 text-sm font-medium text-green-700'>%30</p>
                </span>
            </div>
        </div>
    );
};

export default UpperStats;
"grid col-span-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"