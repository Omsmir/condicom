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
  index
}: {
  appointments: Appointment[] | undefined;
  index:number
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

  const AppointmentStructure = ({
    appointment,
    index,
  }: {
    appointment: Appointment;
    index: number;
  }) => {
    return (
      <div
        key={index}
        className="flex cursor-pointer justify-between mb-2 rounded-md first-of-type:mt-4 mx-4 last-of-type:mb-4 shadow-md shadow-slate-900 transition-all hover:scale-[1.004] hover:opacity-90"
        style={{ backgroundColor: `${appointment.color}` }}
      >
        <div className="flex flex-col justify-center items-start p-3 flex-1">
          <h1 className="text-sm font-medium text-white">{appointment.task}</h1>
          <div className="flex justify-between items-center w-full">
            <p className="text-[12px] text-slate-200">
              {AppointmentDate(appointment)}
            </p>
            <p className="text-[12px] text-slate-200">
              {format(appointment.createdAt, "Pp")}
            </p>
          </div>
        </div>
      </div>
    );
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
          SpecificAppointmentsToHandle.map((appointment, index) => {
            return (
              <AppointmentStructure
                appointment={appointment}
                index={index}
                key={appointment._id}
              />
            );
          })}
      </React.Fragment>
    );
  };
  const AppointmentJsx = (index:number) => {
    return appointments && appointments.length > 0 ? (
      <React.Fragment>
        <SchuduleAppointmentStructure appointments={appointments} isFuture  />

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
  return <AppointmentJsx key={index} />;
};

export default SingleAppointment;
