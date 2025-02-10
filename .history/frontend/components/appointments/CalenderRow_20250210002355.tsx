import clsx from "clsx";
import { format, isToday, getYear, getDayOfYear, isSameDay } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { CalenderHook } from "../context/CalenderProvider";
import { useCallback } from "react";
import { Appointment } from "@/types";

import { useSession } from "next-auth/react";
interface Calender {
  day: Date;
  className?: string;
  classname?: string;
  appointment: Appointment[] | undefined;
}

const CalenderRow: React.FC<Calender> = ({
  day,
  className,
  classname,
  appointment,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { data: session } = useSession();

  const {
    state,
    setState,
    setViewPort,
    setView,
    setWeekView,
    setMonthView,
    setDayView,
  } = CalenderHook();

  const dayToCompare = (day: Date) => {
    const yearOfDayToCompare = getYear(day);
    const dayOfYearToCompare = getDayOfYear(day);

    const obj = {
      year: yearOfDayToCompare,
      day: dayOfYearToCompare,
    };

    return obj;
  };
  const stateTocompare = () => {
    const yearOfDayToCompare = getYear(state);
    const dayOfYearToCompare = getDayOfYear(state);

    const obj = {
      year: yearOfDayToCompare,
      day: dayOfYearToCompare,
    };
    return obj;
  };

  const handleClick = useCallback((day: Date) => {
    setState(day);

    setViewPort(2);

    setWeekView(true);
    setMonthView(false);
    setDayView(false);

    setView("Week'view");
  }, []);

  const setCurrentDay = () => {
    setState(day)
  }
  return (
    <div
      className={clsx(
        "flex flex-col border-b h-32 p-2 cursor-pointer dark:border-slate-700",
        {
          "bg-[var(--sidebar-background)]":
            dayToCompare(day).day === stateTocompare().day,
        },
        className
      )}
      onClick={setCurrentDay}
    >
      <div className="flex justify-end md:justify-start mb-2">
        <div
          className={clsx(
            "flex size-7 rounded-full ",
            {
              "bg-blue-700 text-slate-100 items-center justify-center":
                isToday(day),
            },
            classname
          )}
        >
          <p className="text-[12px]">{format(day, "d")}</p>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {!isMobile ? (
          <div className="flex flex-col justify-between group ">
            {appointment?.map((task, index) => {
              if (
                isSameDay(task.startDate, day)
              ) {
                return (
                  <div
                    onClick={() => handleClick(day)}
                    key={index}
                    style={{ background: task.color }}
                    className={`flex justify-between items-center px-2 py-1 my-1 text-sm text-slate-50 font-medium rounded-sm`}
                  >
                    {format(task.startDate, "h:mm a")} {task.task}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="flex ">
            {appointment?.map((task, index) => {
              if (
                isSameDay(task.startDate, day) &&
                session?.user.id === task.user
              ) {
                return (
                  <div
                    key={index}
                    style={{ background: task.color }}
                    className={`flex justify-center items-center mx-1 text-sm text-slate-50 font-medium rounded-sm  `}
                  >
                    {task.task}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderRow;
