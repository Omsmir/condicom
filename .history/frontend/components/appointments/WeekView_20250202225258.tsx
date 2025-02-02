"use client";

import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { CalenderHook } from "../context/CalenderProvider";
import { inter } from "@/fonts/fonts";
import clsx from "clsx";
import {
  format,
  isToday,
  getDayOfYear,
  addMonths,
  endOfMonth,
  getDate,
} from "date-fns";
import { useMediaQuery } from "react-responsive";
import { Appointment } from "@/types";
import WeekViewRows from "./WeekViewRows";
import { MotionComponent } from "../relatedComponents/Motion";


const WeekView = ({appointments}:{appointments: Appointment[] | undefined}) => {
  const {
    currDate,
    setCurrDate,
    setState,
    state,
    DaysOfWeekCalender,
    theHoursOfDay,
    DaysOfWeekRows
  } = CalenderHook();
  const isMobile = useMediaQuery({ query: "(min-width: 640px)" });

  const handleClickForDayMobile = (day: Date) => {
    if (getDate(endOfMonth(state)) == getDate(day)) {
      const next = addMonths(currDate, 1);

      setCurrDate(next);
      setState(next);
    }
    setState(day);
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 border-y shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="sm:col-span-1 border-r sm:min-w-[56px] dark:border-slate-700"></div>
        <div className="grid grid-cols-12 sm:grid-cols-4 lg:grid-cols-7 col-span-12 sm:col-span-10 overflow-hidden">
          {DaysOfWeekCalender.map((day, index) => (
            <div
              className={clsx(
                `col-span flex justify-center items-center sm:border-r ${inter.className} py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800  dark:border-slate-700`,
                {
                  "bg-blue-200 dark:bg-[var(--sidebar-background)]":
                    getDayOfYear(day) === getDayOfYear(state),
                }
              )}
              key={index}
              onClick={() => handleClickForDayMobile(day)}
            >
              <div className="flex flex-col sm:flex-row justify-center items-center text-[13px] p-2 ">
                <p className="font-medium mx-1 text-slate-600">
                  {isMobile ? format(day, "EEE") : format(day, "EEE").at(0)}
                </p>
                <p
                  className={clsx(
                    "font-semibold size-6 flex justify-center items-center rounded-full",
                    { "text-slate-50 bg-sky-500": isToday(day) }
                  )}
                >
                  {format(day, "d")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="sm:col-span-1"></div>
      </div>
      <OverlayScrollbarsComponent defer>
        <MotionComponent>
        <div className="grid grid-cols-12">
          <div className="grid grid-rows col-span-2 sm:col-span-1 ">
            {theHoursOfDay.map((hour, index) => (
              <p
                className="text-slate-500 font-md text-[13px] text-center mx-2 dark:text-slate-50"
                key={index}
              >
                {format(hour, "ha")}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 border-l sm:grid-cols-4 lg:grid-cols-7 col-span-10 dark:border-slate-700">
            <WeekViewRows appointment={appointments} />
          </div>
          <div className="sm:col-span-1 "></div>
        </div>
        </MotionComponent>
      </OverlayScrollbarsComponent>
    </React.Fragment>
  );
};

export default WeekView;
