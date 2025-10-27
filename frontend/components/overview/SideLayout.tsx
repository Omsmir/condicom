'use client';
import React from 'react';
import ReusablePieChart from '../charts/metrics/ReusablePieChart';
import { ChartConfig } from '../ui/chart';
import SideReminder from './sideRemainder/SideRemainder';
import PatientLayout from './sideRemainder/PatientLayout';

const chartConfig = {
    chrome: {
        label: 'Chrome',
        color: 'var(--oklash)',
    },
    safari: {
        label: 'Safari',
        color: 'var(--oklash-1)',
    },
    firefox: {
        label: 'Firefox',
        color: 'var(--oklash-2)',
    },
    edge: {
        label: 'Edge',
        color: 'var(--oklash-3)',
    },
    other: {
        label: 'Other',
        color: 'var(--oklash-4)',
    },
} satisfies ChartConfig;

const chartData = [
    { browser: 'chrome', visitors: 75, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const SideLayout = () => {
    return (
        <div className="flex flex-col col-span-12 xl:col-span-4 my-2 xl:my-0 xl:pe-4  xl:ps-0 ps-4 pe-4">
            <SideReminder>
                <PatientLayout />
            </SideReminder>
            <ReusablePieChart
                data={chartData}
                chartConfig={chartConfig}
                cardTitle="Browser Usage Statistics"
                cardDescription="last 30 days"
            />
        </div>
    );
};

export default SideLayout;
