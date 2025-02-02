"use client";
import { Appointment } from "@/types";
import clsx from "clsx";
import { isSameDay, format } from "date-fns";
import React from "react";
import { DeleteHandler, ToggleButton } from "../togglers/Handlers";
import { CalenderHook } from "../context/CalenderProvider";
import { useSession } from "next-auth/react";

const DayViewRows = ({
  appointments,
}: {
  appointments: Appointment[] | undefined;
}) => {
  const { DaysOfWeekCalenderForMobileView, theMinutes } = CalenderHook();
  const { data: session } = useSession();

  return (
    <div className="grid grid-cols-1 border-l col-span-10 dark:border-slate-700 ">
      {DaysOfWeekCalenderForMobileView.map((day, index) => (
        <div className="grid border-r py-4 dark:border-slate-700" key={index}>
          {theMinutes.map((halfHour, halfIndex) => {
            const filteredTasks = appointments?.filter((task) => {
              if (
                isSameDay(task.startDate, day) &&
                session?.user.id === task.user &&
                format(task.startDate, "h:mm a") == format(halfHour, "h:mm a")
              ) {
                return task;
              }
            });
            return (
              <div
                className="flex justify-center border-b h-20 relative dark:border-slate-700 "
                key={halfIndex}
              >
                {filteredTasks?.map((task, taskIndex) => (
                  <div
                    key={taskIndex} // Ensure unique key for each task
                    style={{
                      height: task.interval,
                      backgroundColor: task.color,
                    }}
                    className={clsx(
                      `flex w-[98%] rounded-md cursor-pointer z-10 hover:opacity-85 relative main`,
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
    </div>
  );
};

export default DayViewRows;
