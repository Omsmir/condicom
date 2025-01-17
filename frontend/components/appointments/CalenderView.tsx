"use client";
import CalenderRow from "./CalenderRow";
import { CalenderHook } from "../context/CalenderProvider";
import { Days } from "@/lib/constants";
import clsx from "clsx";
import { inter } from "@/fonts/fonts";
import {
  format,
  eachDayOfInterval,
  isToday,
  getDayOfYear,
  eachHourOfInterval,
  startOfDay,
  endOfDay,
  isSameDay,
  eachMinuteOfInterval,
  getMinutes,
  addMonths,
  endOfMonth,
  getDate,
} from "date-fns";
import { MotionComponent } from "../relatedComponents/Motion";
import { useMediaQuery } from "react-responsive";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { Appointments } from "@/types";
import React from "react";
import { DeleteAppointmentButton, ToggleButton } from "../togglers/Handler";
import { useSession } from "next-auth/react";
const CalenderView = ({ appointment }: Appointments) => {
  const {data:session}  = useSession()
  const isMobile = useMediaQuery({ query: "(min-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 1024px)" });
  const {
    state,
    currDate,
    viewPort,
    calendarDays,
    DaysOfthePrevMonth,
    daysOfThisMonth,
    setState,
    setCurrDate
  } = CalenderHook();


  const WeeksInterval = eachDayOfInterval({
    start: state,
    end: calendarDays[41],
  });
  const DaysOfWeekCalender = [...WeeksInterval];
  const DaysOfWeekRows = [...WeeksInterval];

  const DaysOfWeekCalenderForMobileView = [...DaysOfWeekCalender];
  DaysOfWeekCalenderForMobileView.length = 1;

  DaysOfWeekRows.splice(7);
  if (isTablet) {
    DaysOfWeekCalender.splice(7);
  } else if (!isMobile) {
    DaysOfWeekCalender.splice(7);
  } else {
    DaysOfWeekCalender.splice(4);
  }

  const DaysToMapThrough = () => {
    if (isMobile) {
      return DaysOfWeekCalender;
    } else {
      return DaysOfWeekCalenderForMobileView;
    }
  };
  const beginningOfDay = startOfDay(state);
  const terminalOfDay = endOfDay(state);

  const theHoursOfDay = eachHourOfInterval({
    start: beginningOfDay,
    end: terminalOfDay,
  });

  const TheMinutesInterval = eachMinuteOfInterval({
    start: beginningOfDay,
    end: terminalOfDay,
  });

  const theMinutes = TheMinutesInterval.filter(
    (time) => getMinutes(time) % 30 === 0
  );

  const Component: React.FC = () => {
    return (
      <>
        {DaysToMapThrough().map((day, index) => (
          <div className="grid border-r py-4 dark:border-slate-700" key={index}>
            {theMinutes.map((hour, hourIndex) => {
              // Filter tasks for the specific day and hour
              const filteredTasks = appointment.filter((task) => {
                if (
                  isSameDay(task.startDate, day) &&
                  format(task.startDate, "h:mm a") === format(hour, "h:mm a") && session?.user.id === task.user
                ){
                  return task
                }
              });

              return (
                <>
                  <div
                    className="flex justify-center border-b h-20 relative dark:border-slate-700"
                    key={hourIndex}
                  >
                    {filteredTasks.length > 0 &&
                      filteredTasks.map((task, taskIndex) => (
                        <div                        
                          key={taskIndex} // Ensure unique key for each task
                          style={{
                            height: task.interval,
                            backgroundColor: task.color,
                          }}
                          className={clsx(
                            `flex  w-[95%] rounded-md cursor-pointer z-10 hover:opacity-85 relative main`,{"opacity-40 hover:opacity-40 ":task.completed}
                          )}
                        >
                          <ToggleButton id={task._id} state={!task.completed} />
                          <div className="flex flex-col items-start text-slate-50 p-3 ">
                            <p className="font-medium text-[13px]">
                              {format(task.startDate, "h:mm a")}
                            </p>

                            <p className="font-medium text-sm">{task.task}</p>
                            <p className="text-[12px] text-slate-400">{task.description}</p>
                          </div>
                          <DeleteAppointmentButton
                            id={task._id}
                            className="absolute text-slate-50 right-0 hidden hover:text-red-800 transition-colors delete"
                            name="x"
                          />
                        </div>
                      ))}
                  </div>
                </>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  const handleClickForDayMobile = (day: Date) => {

    if(getDate(endOfMonth(state)) ==  getDate(day)){
      const next = addMonths(currDate, 1);

      setCurrDate(next);
      setState(next);
    }
    setState(day);

   
  };

  switch (viewPort) {
    case 1:
      return (
        <>
          <div className="grid grid-cols-7 border-y dark:border-slate-700">
            {Days.map((day, index) => (
              <div
                className={clsx(
                  `flex justify-center items-center border-r dark:border-slate-700 flex-1 last-of-type:border-r-0 ${inter.className}`
                )}
                key={index}
              >
                <p className="text-slate-600 text-[13px] font-semibold p-2 ">
                  {isMobile ? day : day.at(0)}
                </p>
              </div>
            ))}
          </div>
          <OverlayScrollbarsComponent defer>
            <MotionComponent>
              <div className="grid grid-cols-7 grid-rows-6 max-w-[100%]">
                {calendarDays.map((day, index) => {
                  if (
                    !(
                      index >= DaysOfthePrevMonth.length &&
                      index < daysOfThisMonth.length + DaysOfthePrevMonth.length
                    )
                  ) {
                    return (
                      <CalenderRow
                        day={day}
                        className=" border-b border-r bg-[var(--sidebar-background)] hover:bg-slate-200 dark:hover:bg-[var(--sidebar-accent)] cursor-pointer"
                        classname="text-slate-500"
                        key={index}
                        appointment={appointment}
                      />
                    );
                  } else if (index % 7 === 0) {
                    return (
                      <CalenderRow
                        day={day}
                        className="border-r hover:bg-slate-100 dark:hover:bg-[var(--sidebar-background)]"
                        key={index}
                        appointment={appointment}
                      />
                    );
                  } else {
                    return (
                      <CalenderRow
                        day={day}
                        className="border-r hover:bg-slate-100 dark:hover:bg-[var(--sidebar-background)]"
                        key={index}
                        appointment={appointment}
                      />
                    );
                  }
                })}
              </div>
            </MotionComponent>
          </OverlayScrollbarsComponent>
        </>
      );
    case 2:
      return (
        <React.Fragment>
          <div className="grid grid-cols-12 border-y shadow-md dark:bg-slate-800 dark:border-slate-700">
            <div className="sm:col-span-1 border-r sm:min-w-[56px] dark:border-slate-700"></div>
            <div className="grid grid-cols-7 sm:grid-cols-4 lg:grid-cols-7 col-span-12 sm:col-span-10 overflow-hidden">
              {DaysOfWeekCalender.map((day, index) => (
                <div
                  className={clsx(
                    ` flex justify-center items-center sm:border-r ${inter.className} py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800  dark:border-slate-700`,
                    {
                      "bg-blue-200 dark:bg-[var(--sidebar-background)]": getDayOfYear(day) === getDayOfYear(state),
                    }
                  )}
                  key={index}
                  onClick={() => handleClickForDayMobile(day)}
                >
                  <div className="flex flex-col sm:flex-row justify-center items-center text-[13px] p-2 ">
                    <p className="font-medium mx-1 text-slate-600">
                      {isMobile ? format(day, "EEE") : format(day, "EEE").at(0)}
                    </p>
                    <p
                      className={clsx(
                        "font-semibold size-6 flex justify-center items-center rounded-full",
                        { "text-slate-50 bg-sky-500": isToday(day) }
                      )}
                    >
                      {format(day, "d")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sm:col-span-1"></div>
          </div>
          <OverlayScrollbarsComponent defer>
            <div className="grid grid-cols-12" >
              <div className="grid grid-rows col-span-2 sm:col-span-1 ">
                {theHoursOfDay.map((hour, index) => (
                  <p
                    className="text-slate-500 font-md text-[13px] text-center mx-2 dark:text-slate-50"
                    key={index}
                  >
                    {format(hour, "ha")}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 border-l sm:grid-cols-4 lg:grid-cols-7 col-span-10 dark:border-slate-700">
                <Component />
              </div>
              <div className="sm:col-span-1 "></div>
            </div>
          </OverlayScrollbarsComponent>
        </React.Fragment>
      );
    default:
      return null;
  }
};

export default CalenderView;


