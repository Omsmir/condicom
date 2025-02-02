"use client";

import { Appointment } from "@/types";
import { format } from "date-fns";
import React from "react";
import { CalenderHook } from "../context/CalenderProvider";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import DayViewRows from "./DayViewRows";
import DayViewHeader from "./DayViewHeader";
import { MotionComponent } from "../relatedComponents/Motion";

const DayView = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
  const { theHoursOfDay } = CalenderHook();

  return (
    <div className="flex flex-col w-full h-full">
      <DayViewHeader />
      <OverlayScrollbarsComponent defer>
       <MotionComponent>
       <div className="grid grid-cols-12 bg-[var(--sidebar-background)]">
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
          <DayViewRows appointments={appointments} />
          <div className="sm:col-span-1 "></div>
        </div>
       </MotionComponent>
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default DayView;
