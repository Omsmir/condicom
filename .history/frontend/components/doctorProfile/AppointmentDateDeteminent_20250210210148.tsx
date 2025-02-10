"use client"
import { Appointment } from "@/types";
import clsx from "clsx";
import { isAfter, isToday } from "date-fns";
import { CalenderHook } from "../context/CalenderProvider";

const AppointmentDateDeterminent = ({
    appointments,
  }: {
    appointments: Appointment[] | undefined;
  }) => {


    const { currDate } = CalenderHook();

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



  export default AppointmentDateDeterminent