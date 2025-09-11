'use client';
import React from 'react';
import ReuseableAreaChart from '../charts/metrics/ReusableAreaChart';
import ReusableBarChart from '../charts/metrics/ReusableBarChart';

// type ChartDataPoint<T extends Record<string, any>> = {
//   date: string;
// } & T;

// type ChartData<T extends Record<string, any>> = ChartDataPoint<T>[];

// type AppointmentMetrics = {
//   dataOne: number;
//   dataTwo: number;
// };

const chartData = [
    {
        date: 'Tue Jul 15 2025 01:00:00 GMT+0300 (Eastern European Summer Time)',
        appointments: 3,
        booked: 2,
    },
    {
        date: 'Sat Jul 19 2025 01:00:00 GMT+0300 (Eastern European Summer Time)',
        appointments: 2,
        booked: 236,
    },
    {
        date: 'Wed Jul 23 2025 02:30:00 GMT+0300 (Eastern European Summer Time)',
        appointments: 230,
        booked: 7,
    },
];



const barChartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
];


const ChartsLayout = () => {
    return (
        <div className="grid col-span-12 xl:col-span-8  gap-4 ps-4 pe-2">
            <div className="flex flex-col">
                <ReuseableAreaChart
                    data={chartData}
                    dataOneKey="appointments"
                    dataTwoKey="booked"
                    dataOneLabel="completed appointments"
                    dataTwoLabel="booked appointments"
                    cardTitle='Appointments Overview'
                    cardDescription='Showing total appointments for the last 3 months'
                />
                <ReusableBarChart data={barChartData} dataKey='desktop' dataLabel='visitors' cardTitle='Invoices last 6 month' cardDescription='' />
            </div>
        </div>
    );
};

export default ChartsLayout;
