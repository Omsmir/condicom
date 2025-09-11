'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { format } from 'date-fns';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface AreaChartProps {
    data: Array<{
        date: string;
        [key: string]: number | string; // Allow other keys with numeric values
    }>;
    dataOneLabel: string;
    dataTwoLabel: string;
    dataOneKey: string;
    dataTwoKey: string;
    cardTitle?: string;
    cardDescription?: string;
}

const ReusableAreaChart = ({
    data,
    dataOneLabel,
    dataOneKey,
    dataTwoLabel,
    dataTwoKey,
    cardDescription,
    cardTitle,
}: AreaChartProps) => {
    const [timeRange, setTimeRange] = React.useState('90d');

    const filteredData = data.filter(item => {
        const date = new Date(item.date);
        const referenceDate = new Date('2024-06-30');
        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    const chartConfig = {
        [dataOneKey]: {
            label: `${dataOneLabel}`,
            color: 'var(--oklash)',
        },
        [dataTwoKey]: {
            label: dataTwoLabel,
            color: 'var(--oklash-1)',
        },
    } satisfies ChartConfig;

    return (
        <Card className="pt-0 mb-4 border-0 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row bg-[var(--sidebar-background)] ">
                <div className="grid flex-1 gap-1">
                    <CardTitle className='capitalize'>{cardTitle ? cardTitle : 'Interactive Area - Chart'}</CardTitle>
                    <CardDescription>
                        {cardDescription
                            ? cardDescription
                            : 'Showing total visitors for the last 3 months'}
                    </CardDescription>
                </div>
                <Select
                    value={timeRange}
                    onValueChange={setTimeRange}
                >
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex bg-[var(--sidebar-background)]"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-[var(--sidebar-background)] z-100 border-0">
                        <SelectItem
                            value="90d"
                            className="rounded-lg cursor-pointer transition-colors hover:bg-slate-100  dark:hover:bg-slate-800"
                        >
                            Last 3 months
                        </SelectItem>
                        <SelectItem
                            value="30d"
                            className="rounded-lg cursor-pointer transition-colors hover:bg-slate-100  dark:hover:bg-slate-800"
                        >
                            Last 30 days
                        </SelectItem>
                        <SelectItem
                            value="7d"
                            className="rounded-lg cursor-pointer transition-colors hover:bg-slate-100  dark:hover:bg-slate-800"
                        >
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 bg-[var(--sidebar-background)]">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillDataOne"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={chartConfig[dataOneKey].color}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={chartConfig[dataOneKey].color}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillDataTwo"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={chartConfig[dataTwoKey].color}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={chartConfig[dataTwoKey].color}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            minTickGap={10}
                            tickFormatter={value => {
                                const date = new Date(value);
                                const form = `${format(date, 'p')}`;
                                return form;
                            }}
                        />
                        <ChartTooltip
                            cursor={{ stroke: '#ccc', strokeWidth: 1 }}
                            content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;

                                // Access the custom field
                                const data = payload[0].payload;

                                return (
                                    <div className="bg-[var(--sidebar-background)] shadow-md rounded-md p-3 text-sm max-w-xs">
                                        <div className="font-semibold mb-1">
                                            {new Date(label).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </div>
                                        <div className="flex flex-col justify-start items-start">
                                            <div className="flex mb-2 capitalize ">
                                                {dataOneLabel}:
                                                <p className="text-green-500 ms-1">
                                                    {Number(data[dataOneKey])}
                                                </p>
                                            </div>
                                            <div className="flex mb-2 capitalize">
                                                {dataTwoLabel}:
                                                <p className="text-green-500 ms-1">
                                                    {Number(data[dataTwoKey])}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        />

                        <Area
                            dataKey={dataOneKey}
                            type="natural"
                            fill="url(#fillDataTwo)"
                            stroke={chartConfig[dataTwoKey].color}
                            stackId="a"
                        />
                        <Area
                            dataKey={dataTwoKey}
                            type="natural"
                            fill="url(#fillDataOne)"
                            stroke={chartConfig[dataOneKey].color}
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ReusableAreaChart;
