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

const SingleAppointment = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
  const AppointmentDate = (appointment: Appointment) => {
    const startDate = format(appointment.startDate, "PPpp");

    const endDate = format(appointment.endDate, "p");

    return `${startDate} - ${endDate}`;
  };

  const { currDate } = CalenderHook();

  const AppointmentDateDeterminent = ({
    appointments,
  }: {
    appointments: Appointment[] | undefined;
  }) => {
    const DateStructure = ({ time }: { time: string }) => {
      return (
        <div className="flex p-4">
          <h1
            className={clsx(
              "text-slate-500 font-medium capitalize text-[14px]",
              {
                "text-slate-900 dark:text-slate-50 font-bold": time == "today",
              }
            )}
          >
            {time}
          </h1>
        </div>
      );
    };
    return appointments
      ?.map((appointment) => {
        if (isToday(appointment.startDate)) {
          return <DateStructure time="today" />;
        } else if (isAfter(appointment.startDate, currDate)) {
          return <DateStructure time="Upcoming" />;
        }

        return <DateStructure time="other" />;
      })
      .slice(0, 1);
  };


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
