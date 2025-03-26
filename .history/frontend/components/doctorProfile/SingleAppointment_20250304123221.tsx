"use client";
import { Appointment } from "@/types";
import { isToday, isBefore, getDate, isAfter } from "date-fns";
import React from "react";
import { CalenderHook } from "../context/CalenderProvider";
import AppointmentStructure from "./AppointmentStructure";
import AppointmentDateDeterminent from "./AppointmentDateDeteminent";

const SingleAppointment = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
  const { currDate } = CalenderHook();

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
        {SpecificAppointmentsToHandle &&
          SpecificAppointmentsToHandle.length > 0 && (
            <AppointmentDateDeterminent
              appointments={SpecificAppointmentsToHandle}
            />
          )}

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

  return appointments && appointments.length > 0 ? (
    <React.Fragment>
      <SchuduleAppointmentStructure key={12} appointments={appointments} isFuture />

      <SchuduleAppointmentStructure
        isTrue={isToday}
        appointments={appointments}
        key={}
      />
      <SchuduleAppointmentStructure appointments={appointments} />
    </React.Fragment>
  ) : (
    <div className="flex justify-center items-center h-full">
      <h1>No Appointments</h1>
    </div>
  );
};

export default SingleAppointment;
