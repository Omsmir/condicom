"use client"
import React from 'react'
import CalenderRow from "./CalenderRow";
import { CalenderHook } from "../context/CalenderProvider";
import { Days } from "@/lib/constants";
import clsx from "clsx";
import { inter } from "@/fonts/fonts";
import { MotionComponent } from "../relatedComponents/Motion";
import { useMediaQuery } from "react-responsive";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { Appointment } from "@/types";

const MonthView = ({appointments}:{appointments: Appointment[] | undefined}) => {
      const isMobile = useMediaQuery({ query: "(min-width: 640px)" });
      const {
        calendarDays,
        DaysOfthePrevMonth,
        daysOfThisMonth,
      } = CalenderHook();
    
    
  return (
    <>
    <div className="grid grid-cols-7 border-y dark:border-slate-700" id=''>
      {Days.map((day, index) => (
        <div
          className={clsx(
            `flex justify-center items-center border-r dark:border-slate-700 flex-1 last-of-type:border-r-0 ${inter.className}`
          )}
          key={index}
        >
          <p className="text-slate-600 text-[13px] font-semibold p-2 ">
            {isMobile ? day : day.at(0)}
          </p>
        </div>
      ))}
    </div>
    <OverlayScrollbarsComponent defer>
      <MotionComponent>
        <div className="grid grid-cols-7 grid-rows-6 max-w-[100%]">
          {calendarDays.map((day, index) => {
            if (
              !(
                index >= DaysOfthePrevMonth.length &&
                index < daysOfThisMonth.length + DaysOfthePrevMonth.length
              )
            ) {
              return (
                <CalenderRow
                  day={day}
                  className=" border-b border-r bg-[var(--sidebar-background)] hover:bg-slate-200 dark:hover:bg-[var(--sidebar-accent)] cursor-pointer"
                  classname="text-slate-500"
                  key={index}
                  appointment={appointments}
                />
              );
            } else if (index % 7 === 0) {
              return (
                <CalenderRow
                  day={day}
                  className="border-r hover:bg-slate-100 dark:hover:bg-[var(--sidebar-background)]"
                  key={index}
                  appointment={appointments}
                />
              );
            } else {
              return (
                <CalenderRow
                  day={day}
                  className="border-r hover:bg-slate-100 dark:hover:bg-[var(--sidebar-background)]"
                  key={index}
                  appointment={appointments}
                />
              );
            }
          })}
        </div>
      </MotionComponent>
    </OverlayScrollbarsComponent>
  </>
  )
}

export default MonthView
