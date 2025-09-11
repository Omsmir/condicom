'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

export const description = 'An interactive bar chart';

interface ReusableBarChartProps {
    data: Array<{
        month: string;
        [key: string]: number | string; // Allow other keys with numeric values
    }>;
    dataKey: string;
    dataLabel: string;
    cardTitle?: string;
    cardDescription?: string;
    cardFooterDescription?: string;
    cardPercentage?: string;
}

const ReusableBarChart = ({
    data,
    dataKey,
    dataLabel,
    cardTitle,
    cardDescription,
    cardFooterDescription,
    cardPercentage,
}: ReusableBarChartProps) => {
    const chartConfig = {
        [dataKey]: {
            label: dataLabel,
            color: 'var(--oklash)',
        },
    } satisfies ChartConfig;

    return (
        <Card className="pt-0 mb-4 border-0 shadow-md rounded-lg  bg-[var(--sidebar-background)]">
            <CardHeader className="  py-5 ">
                <CardTitle className="capitalize">
                    {cardTitle ? cardTitle : 'Bar Chart - Horizontal'}
                </CardTitle>
                <CardDescription>
                    {cardDescription ? cardDescription : 'January - June 2024'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="fillDesktop"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={chartConfig[dataKey].color}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={chartConfig[dataKey].color}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={true} />
                        <XAxis
                            type="number"
                            dataKey={dataKey}
                            hide
                        />
                        <YAxis
                            dataKey="month"
                            stopColor={`var(--${dataKey}-color)`}
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload, label }) => {
                                if (!active || !payload || payload.length === 0) {
                                    return null;
                                }
                                const data = payload[0].payload;
                                console.log('data', data);
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="flex flex-col justify-start items-start bg-[var(--sidebar-background)] p-2 rounded-md">
                                            <p className="font-medium capitalize">
                                                {chartConfig[dataKey].label}: {data[dataKey]}
                                            </p>
                                        </div>
                                    );
                                }
                            }}
                        />
                        <Bar
                            dataKey={dataKey}
                            fill="url(#fillDesktop)"
                            radius={5}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up this month by <p className="text-green-500 mx-0">{cardPercentage ? cardPercentage : 5.2}%</p>{' '}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    {cardFooterDescription
                        ? cardFooterDescription
                        : 'Showing total visitors for the last 6 months'}
                </div>
            </CardFooter>
        </Card>
    );
};
export default ReusableBarChart;
