"use client";
import { Appointment, UserInformation } from "@/types";
import { Divider } from "@mui/material";
import React from "react";
import SingleAppointment from "./SingleAppointment";
import { UseUserAppointments } from "@/actions/queries";

const DoctorAppointments = ({
 id
}: {
  id: string | undefined;
}) => {
  const { data,isError,error,isLoading } = UseUserAppointments(id);

  
  if(isLoading) return <Loading />

  if(isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-sm font-medium">{error.message}</h1>
      </div>
    )
  }

  const appointments = data?.userAppointments

  if(data)

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
