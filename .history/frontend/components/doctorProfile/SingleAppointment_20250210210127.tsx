"use client";
import { Appointment } from "@/types";
import {
  isToday,
  format,
  isTomorrow,
  isYesterday,
  isBefore,
  getDate,
  isAfter,
} from "date-fns";
import React from "react";
import { CalenderHook } from "../context/CalenderProvider";
import clsx from "clsx";
import AppointmentStructure from "./AppointmentStructure";

const SingleAppointment = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
 




  const SchuduleAppointmentStructure = ({
    isFuture,
    isTrue,
    appointments,
  }: {
    isFuture?: boolean;
    isTrue?: (date: Date) => boolean;
    appointments: Appointment[] | undefined;
  }) => {
    const SpecificAppointmentsToHandle = appointments?.filter((appointment) => {
      if (isTrue) {
        return isTrue(appointment.startDate);
      } else if (isFuture) {
        return isAfter(getDate(appointment.startDate), currDate.getDate());
      } else {
        return isBefore(getDate(appointment.startDate), currDate.getDate());
      }
    });

    return (
      <React.Fragment>
        <AppointmentDateDeterminent
          key={Date.now()}
          appointments={SpecificAppointmentsToHandle}
        />

        {SpecificAppointmentsToHandle &&
          SpecificAppointmentsToHandle.map((appointment) => {
            return (
              <AppointmentStructure
                appointment={appointment}
                key={appointment._id}
              />
            );
          })}
      </React.Fragment>
    );
  };
  const AppointmentJsx = () => {
    return appointments && appointments.length > 0 ? (
      <React.Fragment>
        <SchuduleAppointmentStructure appointments={appointments} isFuture />

        <SchuduleAppointmentStructure
          isTrue={isToday}
          appointments={appointments}
        />
        <SchuduleAppointmentStructure appointments={appointments} />
      </React.Fragment>
    ) : (
      <div className="flex justify-center items-center h-full">
        <h1>No Appointments</h1>
      </div>
    );
  };
  return <AppointmentJsx />;
};

export default SingleAppointment;
