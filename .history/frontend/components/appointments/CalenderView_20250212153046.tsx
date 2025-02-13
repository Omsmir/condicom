"use client";
import { CalenderHook } from "../context/CalenderProvider";
import React from "react";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import DayView from "./DayView";
import { UseUserAppointments } from "@/actions/queries";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

const Calender = () => {
  const { viewPort } = CalenderHook();

  const { data: session } = useSession();
  const { data ,isLoading,isFetching,isRefetching} = UseUserAppointments(session?.user.id);
if(isLoading || isFetching) return <Loading />

  if (data)
    switch (viewPort) {
      case 1:
        return <MonthView appointments={data?.userAppointments} />;
      case 2:
        return <WeekView appointments={data?.userAppointments} />;
      case 3:
        return <DayView appointments={data?.userAppointments} />;
      default:
        return null;
    }
};

export default Calender;
