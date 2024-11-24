"use client";
import { inter } from "@/fonts/fonts";
import { Days, months } from "@/lib/constants";
import clsx from "clsx";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
  getDaysInMonth,
  eachDayOfInterval,
  getDay,
  format,
  differenceInDays,
  getMonth,
  getYear,
  addDays,
  subDays,
  getDayOfYear
  
} from "date-fns";
import { useState } from "react";
import CalenderRow from "./relatedComponents/CalenderRow";
import { CalenderHook } from "./context/CalenderProvider";
import { FadeMenu } from "./togglers/FadeMenu";
import { Button } from "./ui/button";

const Calender = () => {
  const { currDate, setCurrDate } = CalenderHook();

  const FirstDayOfTheMonth = startOfMonth(currDate); // The First Day Of The Month
  const TheLastDayOfTheMonth = endOfMonth(currDate); // The Last Day Of The Month
  const Today = getDayOfYear(currDate)

  const daysOfThisMonth = eachDayOfInterval({
    // The Total Number Of Days Of This Month
    start: FirstDayOfTheMonth,
    end: TheLastDayOfTheMonth,
  });
  const prevMonth = subMonths(currDate, 1);
  const nextMonth = addMonths(currDate, 1);

  // Get the starting day of the week for the first day of the current month (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = getDay(FirstDayOfTheMonth); // e.g., 0 for Sunday, 1 for Monday, etc.

  const endDayofWeek = getDay(TheLastDayOfTheMonth);

  const endOfPrevMonth = endOfMonth(prevMonth);
  const StartOfNextMonth = startOfMonth(nextMonth);

  const DateOfPrev = new Date(
    endOfPrevMonth.setDate(endOfPrevMonth.getDate() - startDayOfWeek)
  );

  const DaysOfthePrevMonth = eachDayOfInterval({
    start: DateOfPrev,
    end: endOfMonth(prevMonth),
  });

  const DaysOftheNextMonth = eachDayOfInterval({
    start: startOfMonth(nextMonth),
    end: endOfMonth(nextMonth),
  });
  // Create a full list of days including padding days (null for empty spots)
  const calendarDays = [
    ...DaysOfthePrevMonth,
    ...daysOfThisMonth,
    ...DaysOftheNextMonth,
  ];

  calendarDays.length = 42;

  console.log(Today);
  return (
    <div className="flex h-screen min-h-screen pt-16 overflow-y-auto">
      <div className="flex flex-col w-full">
        <div className="flex p-4 justify-between items-center border border-b-0 bg-slate-100">
          <div className="flex items-center font-medium">
            {months.map((month, index) => {
              if (index === getMonth(currDate)) {
                return <p>{month}</p>;
              }
            })}

            <p className="mx-1">{currDate.getFullYear()}</p>
          </div>
          <div className="flex relative">
            <div className="flex items-center border rounded-md mx-2">
              <Button className="hover:bg-slate-200">&lt;</Button>
              <p className="text-sm font-medium">Today</p>
              <Button className="hover:bg-slate-200">&gt;</Button>
            </div>
            <FadeMenu />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {Days.map((day) => (
            <div
              className={clsx(
                `flex justify-center items-center border border-l-0 flex-1 first-of-type:border-l ${inter.className}`
              )}
            >
              <p className="text-slate-600 text-[13px] font-semibold p-2 ">
                {day}
              </p>
            </div>
          ))}
        </div>
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
                  className=" border-b border-r first-of-type:border-l bg-slate-100  hover:bg-slate-200 cursor-pointer"
                  classname="text-slate-500"
                />
              );
            } else if (index % 7 === 0) {
              return (
                <CalenderRow
                  day={day}
                  className="border-x hover:bg-slate-100"
                />
              );
            } else {
              return (
                <CalenderRow
                  day={day}
                  className="border-r hover:bg-slate-100"
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Calender;
