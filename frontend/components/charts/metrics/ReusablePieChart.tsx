'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A pie chart with no separator';

interface ReusablePieChartProps {
    data: Array<{
        browser: string;
        visitors: number; // Allow other keys with numeric values
        fill: string;
    }>;
    chartConfig: {
        [key: string]: {
            label: string | any;
            color: string;
        };
    };
    cardTitle?: string;
    cardDescription?: string;
}

const ReusablePieChart = ({
    data,
    chartConfig,

    cardTitle,
    cardDescription,
}: ReusablePieChartProps) => {
    return (
        <Card className="flex flex-col border-0  shadow-md rounded-lg  bg-[var(--sidebar-background)] mt-2">
            <CardHeader className="items-start pb-0">
                <CardTitle>{cardTitle ? cardTitle : 'Pie Chart - Legend'}</CardTitle>
                <CardDescription>
                    {cardDescription ? cardDescription : 'January - June 2024'}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="w-full aspect-square h-[250px] max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload }) => {
                                if (!active || !payload || payload.length === 0) {
                                    return null;
                                }
                                const data = payload[0].payload;
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="flex flex-col justify-start items-start bg-[var(--sidebar-background)] p-2 rounded-md">
                                            <p className="font-medium capitalize">
                                                visitors: {data.visitors}
                                            </p>
                                        </div>
                                    );
                                }
                            }}
                        />
                        <Pie
                            data={data}
                            dataKey="visitors"
                            nameKey="browser"
                            stroke={'none'}
                            strokeWidth={10}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="browser" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ReusablePieChart;
