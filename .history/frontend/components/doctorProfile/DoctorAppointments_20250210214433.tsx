"use client";
import { Appointment, UserInformation } from "@/types";
import { Divider } from "@mui/material";
import { format, isToday } from "date-fns";
import React from "react";
import SingleAppointment from "./SingleAppointment";

const DoctorAppointments = ({
  user,
  appointments,
}: {
  user: UserInformation | undefined;
  appointments: Appointment[] | undefined;
}) => {
 
  return (
    <div className="flex flex-1 flex-col bg-[var(--sidebar-background)] rounded-md overflow-hidden">
      <div className="flex p-4 items-center">
        <h1 className="dark:text-slate-500 font-medium">Appointments</h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0" />
      <div className="flex flex-col min-h-[365px] max-h-[365px] overflow-y-scroll">
        <SingleAppointment appointments={appointments}  />
      </div>
    </div>
  );
};

export default DoctorAppointments;
