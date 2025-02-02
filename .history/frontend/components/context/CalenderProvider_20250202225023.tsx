"use client";

import {
  addMonths,
  eachDayOfInterval,
  EachDayOfIntervalResult,
  eachHourOfInterval,
  EachHourOfIntervalResult,
  eachMinuteOfInterval,
  EachMinuteOfIntervalResult,
  endOfDay,
  endOfMonth,
  getDay,
  getDayOfYear,
  getMinutes,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useContext, createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useMediaQuery } from "react-responsive";

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
  DayView: CheckedState | undefined;
  WeeksInterval: EachDayOfIntervalResult<{
    start: Date;
    end: Date;
}, undefined>;
DaysOfWeekCalender: Date[];
DaysOfWeekRows: Date[];
DaysOfWeekCalenderForMobileView: Date[];
 theHoursOfDay: EachHourOfIntervalResult<{
  start: Date;
  end: Date;
}, undefined>;
TheMinutesInterval: EachMinuteOfIntervalResult<{
  start: Date;
  end: Date;
}, undefined>;
theMinutes: Date[];
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

  const prevMonth = subMonths(currDate, 1);
  const nextMonth = addMonths(currDate, 1);

  // Get the starting day of the week for the first day of the current month (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = getDay(FirstDayOfTheMonth); // e.g., 0 for Sunday, 1 for Monday, etc.


  const endOfPrevMonth = endOfMonth(prevMonth);

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


  
    const WeeksInterval = eachDayOfInterval({
      start: state,
      end: calendarDays[41],
    });

    const DaysOfWeekCalender = [...WeeksInterval];

    const isMobile = useMediaQuery({ query: "(min-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 1024px)" });

  if (isMobile) {
    DaysOfWeekCalender.splice(7);
  } 
    const DaysOfWeekRows = [...WeeksInterval];


    const DaysOfWeekCalenderForMobileView = [...DaysOfWeekCalender];

    DaysOfWeekCalenderForMobileView.length = 1

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
        theHoursOfDay,
        theMinutes,
        TheMinutesInterval,
        WeeksInterval,
        DaysOfWeekCalender,
        DaysOfWeekCalenderForMobileView,
        DaysOfWeekRows
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
