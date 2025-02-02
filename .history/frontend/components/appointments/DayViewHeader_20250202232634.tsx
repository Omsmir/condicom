import clsx from "clsx";
import { format, isToday } from "date-fns";
import React from "react";
import { CalenderHook } from "../context/CalenderProvider";

const DayViewHeader = () => {
  const { DaysOfWeekCalenderForMobileView } = CalenderHook();

  const HeaderDayFormat = (Dateformat: string) => {
    return format(DaysOfWeekCalenderForMobileView[0], `${Dateformat}`);
  };
  return (
    <div className="grid grid-cols-12 border-y shadow-sm dark:bg-slate-800 dark:border-slate-700 bg-[var(--sidebar-background)] z-10">
      <div className="col-span-2 sm:col-span-1 sm:min-w-[56px]"></div>
      <div className="flex justify-center h-14 items-center col-span-10 overflow-hidden border-x dark:border-slate-700">
        <div className="flex justify-center items-center h-full">
          <h1 className="font-medium mr-1"> {HeaderDayFormat("EEEE")}</h1>
          <span
            className={clsx(
              "flex justify-center items-center size-8 rounded-full dark:bg-slate-700 bg-slate-100",
              {
                "bg-blue-800 text-slate-50 font-medium dark:bg-slate-400": isToday(
                  DaysOfWeekCalenderForMobileView[0]
                ),
              }
            )}
          >
            <p >{HeaderDayFormat("d")}</p>
          </span>
        </div>
      </div>
      <div className="sm:col-span-1"></div>
    </div>
  );
};

export default DayViewHeader;
