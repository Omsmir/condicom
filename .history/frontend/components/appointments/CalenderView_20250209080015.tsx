"use client";
import { CalenderHook } from "../context/CalenderProvider";
import { Appointment } from "@/types";
import React from "react";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import DayView from "./DayView";

const CalenderView = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
  const { viewPort } = CalenderHook();

  
  switch (viewPort) {
    case 1:
      return <MonthView appointments={appointments} />;
    case 2:
      return <WeekView appointments={appointments} />;
      case 3: 
      return <DayView appointments={appointments} />
    default:
      return null;
  }
};

export default CalenderView;
