import { differenceInCalendarMonths, isThisMonth, subMonths } from 'date-fns';
import React from 'react';

export const BulletDecorator = ({ day }: { day: Date }) => {
    const MonthDifference = differenceInCalendarMonths(new Date(), day);
    const switchOnBulletColors = (): { className: string } => {
        if (isThisMonth(day)) {
            return { className: 'bg-green-500' };
        } else if (MonthDifference <= 6) {
            return { className: 'bg-yellow-500' };
        } else {
            return { className: 'bg-gray-500' };
        }
    };

    const { className } = switchOnBulletColors();

    return <span className={`${className} rounded-full size-2`}></span>;
};

export const BulletsDescription = () => {
    return (
        <div className="flex justify-start items-center px-4">
            <div className="flex items-center ml-2">
                <span className="bg-green-500 rounded-full size-2 mr-1"></span>
                <span className="text-xs text-gray-500">This Month</span>
            </div>
            <div className="flex items-center ml-2">
                <span className="bg-yellow-500 rounded-full size-2 mr-1"></span>
                <span className="text-xs text-gray-500">Last 6 Months</span>
            </div>
            <div className="flex items-center ml-2">
                <span className="bg-gray-500 rounded-full size-2 mr-1"></span>
                <span className="text-xs text-gray-500">Year Or More</span>
            </div>
        </div>
    );
};
