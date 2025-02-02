"use client";

import { Appointment } from "@/types";
import clsx from "clsx";
import { isSameDay, format } from "date-fns";
import React from "react";
import { DeleteHandler, ToggleButton } from "../togglers/Handlers";
import { CalenderHook } from "../context/CalenderProvider";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "react-responsive";

const WeekViewRows = ({
  appointment,
}: {
  appointment: Appointment[] | undefined;
}) => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ query: "(min-width: 640px)" });

  const { DaysOfWeekCalender, DaysOfWeekCalenderForMobileView, theMinutes } =
    CalenderHook();

  const DaysToMapThrough = () => {
    if (isMobile) {
      return DaysOfWeekCalender;
    } else {
      return DaysOfWeekCalenderForMobileView;
    }
  };
  return (
    <React.Fragment>
      {DaysToMapThrough().map((day, index) => (
        <div className="grid border-r py-4 dark:border-slate-700" key={index}>
          {theMinutes.map((hour, hourIndex) => {
            // Filter tasks for the specific day and hour
            const filteredTasks = appointment?.filter((task) => {
              if (
                isSameDay(task.startDate, day) &&
                format(task.startDate, "h:mm a") === format(hour, "h:mm a") &&
                session?.user.id === task.user
              ) {
                return task;
              }
            });

            return (
              <div
                className="flex justify-center cursor-pointer border-b h-20 relative dark:border-slate-700 bg-[var(--sidebar-background)] hover:bg-[var(--sidebar-background)]"
                key={hourIndex}
              >
                {filteredTasks &&
                  filteredTasks.length > 0 &&
                  filteredTasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex} // Ensure unique key for each task
                      style={{
                        height: task.interval,
                        backgroundColor: task.color
                
                      }}
                      className={clsx(
                        `flex  w-[95%] rounded-md cursor-pointer z-10 hover:opacity-85 relative main`,
                        { "opacity-40 hover:opacity-40 ": task.completed }
                      )}
                    >
                      <ToggleButton id={task._id} state={!task.completed} />
                      <div className="flex flex-col items-start text-slate-50 p-3 ">
                        <p className="font-medium text-[13px]">
                          {format(task.startDate, "h:mm a")}
                        </p>

                        <p className="font-medium text-sm">{task.task}</p>
                        <p className="text-[12px] text-slate-400">
                          {task.description}
                        </p>
                      </div>
                      <DeleteHandler
                      id={task._id}
                      apiString="appointments"
                      messagePopup="do you want to delete the appointment"
                      className="absolute text-slate-50 right-0 hidden hover:text-red-800 transition-colors delete"
                      name="x"
                    />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      ))}
    </React.Fragment>
  );
};

export default WeekViewRows;
