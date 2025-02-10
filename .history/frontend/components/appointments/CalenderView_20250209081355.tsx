"use client";
import { CalenderHook } from "../context/CalenderProvider";
import { Appointment } from "@/types";
import React from "react";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import { UseUserAppointments } from "@/actions/queries";
import { useSession } from "next-auth/react";

const CalenderView = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
  const { viewPort } = CalenderHook();

  const { data:session} = useSession()
  const {data}= UseUserAppointments(session?.user.id)

  if(data.use)
  console.log(data)
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
