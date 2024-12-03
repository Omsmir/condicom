"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  getDayOfYear,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useContext, createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

export interface CalendarContextType {
  state: Date;
  setState: Dispatch<SetStateAction<Date>>;
  currDate: Date;
  setCurrDate: Dispatch<SetStateAction<Date>>;
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  DaysOfthePrevMonth: Date[];
  DaysOftheNextMonth: Date[];
  daysOfThisMonth: Date[];
  calendarDays: Date[];
  viewPort: number | boolean;
  setViewPort: Dispatch<SetStateAction<number>>;
  TheLastDayOfTheMonth: Date;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setMonthView: Dispatch<SetStateAction<CheckedState | undefined>>;
  MonthView: CheckedState | undefined;
  setWeekView: Dispatch<SetStateAction<CheckedState | undefined>>;
  WeekView: CheckedState | undefined;
  setDayView: Dispatch<SetStateAction<CheckedState | undefined>>;
  DayView: CheckedState | undefined
}
type CheckedState = boolean | "indeterminate";
type Checked = DropdownMenuCheckboxItemProps["checked"];

const CalenderContext = createContext<CalendarContextType | null>(null);

export const CalenderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currDate, setCurrDate] = useState(new Date());
  const [view, setView] = useState("Week'view");
  const [viewPort, setViewPort] = useState<number>(2);
  const [state, setState] = useState(currDate);
  const [visible, setVisible] = useState<boolean>(false);
  const [date,setDate] = useState<Date>(new Date())
  const [disabled,setDisabled] = useState<boolean>(true)
  const [MonthView, setMonthView] = useState<Checked>(false);
  const [WeekView, setWeekView] = useState<Checked>(true);
  const [DayView, setDayView] = useState<Checked>(false);
  const FirstDayOfTheMonth = startOfMonth(currDate); // The First Day Of The Month
  const TheLastDayOfTheMonth = endOfMonth(currDate); // The Last Day Of The Month
  const Today = getDayOfYear(currDate);

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
  const daysOfThisMonth = eachDayOfInterval({
    // The Total Number Of Days Of This Month
    start: FirstDayOfTheMonth,
    end: TheLastDayOfTheMonth,
  });

  const DaysOfthePrevMonth = eachDayOfInterval({
    start: DateOfPrev,
    end: endOfMonth(prevMonth),
  });

  const DaysOftheNextMonth = eachDayOfInterval({
    start: startOfMonth(nextMonth),
    end: endOfMonth(nextMonth),
  });
  // Create a full list of days including padding days (null for empty spots)
  const calendarDays: Date[] = [
    ...DaysOfthePrevMonth,
    ...daysOfThisMonth,
    ...DaysOftheNextMonth,
  ];

  calendarDays.length = 42;
  return (
    <CalenderContext.Provider
      value={{
        MonthView,
        setMonthView,
        WeekView,
        setWeekView,
        DayView,
        setDayView,
        disabled,
        setDisabled,
        date,
        setDate,
        visible,
        setVisible,
        TheLastDayOfTheMonth,
        viewPort,
        setViewPort,
        state,
        setState,
        currDate,
        setCurrDate,
        view,
        setView,
        DaysOfthePrevMonth,
        DaysOftheNextMonth,
        daysOfThisMonth,
        calendarDays,
      }}
    >
      {children}
    </CalenderContext.Provider>
  );
};

export const CalenderHook = () => {
  const context = useContext(CalenderContext);

  if (!context) {
    throw new Error("CalenderHook must be used within a CalenderProvider");
  }
  return context;
};
