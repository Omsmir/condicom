"use client";
import * as React from "react";
import {
  addDays,
  subDays,
  getDay,
  isToday,
  isTomorrow,
  isYesterday,
  isAfter,
  isBefore,
  differenceInCalendarDays,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalenderHook } from "../context/CalenderProvider";
import { Days } from "@/lib/constants";
import { useMediaQuery } from "react-responsive";
import AddEvent from "../AddEvent";
import { Table } from "@tanstack/react-table";

import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";

export function FadeMenu() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const {
    view,
    setView,
    setViewPort,
    DayView,
    setDayView,
    WeekView,
    setWeekView,
    MonthView,
    setMonthView,
  } = CalenderHook();

  const handleView = ({
    text,
    onclick,
  }: {
    text: string;
    onclick?: React.Dispatch<React.SetStateAction<any>>;
  }) => {
    setView(text);

    setWeekView(false);
    setDayView(false);
    setMonthView(false);

    if (onclick) {
      onclick(true);
    }
  };

  const MenuToReturnBasedOnMedia = ({
    children,
  }: {
    children?: React.ReactNode;
  }) => {
    return (
      <>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-slate-200 dark:hover:bg-slate-800 dark:border-slate-800"
          >
            {!isMobile && view} <p className="-rotate-90">&lt;</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-slate-100 p-0 dark:bg-[var(--sidebar-accent)] dark:border-slate-800">
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            className="hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)] cursor-pointer"
            checked={MonthView}
            onCheckedChange={() =>
              handleView({ text: "Month'view", onclick: setMonthView })
            }
            onClick={() => setViewPort(1)}
          >
            Month'view
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)] cursor-pointer"
            checked={WeekView}
            onCheckedChange={() =>
              handleView({ text: "Week'view", onclick: setWeekView })
            }
            onClick={() => setViewPort(2)}
          >
            Week'view{" "}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)] cursor-pointer"
            checked={DayView}
            onCheckedChange={() =>
              handleView({ text: "Day'view", onclick: setDayView })
            }
            onClick={() => setViewPort(3)}
          >
            Day'view
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </>
    );
  };
  return (
    <DropdownMenu>
      <MenuToReturnBasedOnMedia />
    </DropdownMenu>
  );
}
export const SwitchMonth = () => {
  const { setCurrDate, currDate, setState } = CalenderHook();

  const nextMonth = () => {
    const next = addMonths(currDate, 1);

    setCurrDate(next);
    setState(next);
  };
  const prevMonth = () => {
    const prev = subMonths(currDate, 1);
    prev.setDate(1);
    setCurrDate(prev);
    setState(prev);
  };

  return (
    <div className="flex items-center border rounded-md mx-2 dark:border-slate-800">
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800 "
        onClick={prevMonth}
      >
        &lt;
      </Button>
      <div className="text-sm font-medium ">{format(currDate, "MMMM")}</div>
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={nextMonth}
      >
        &gt;
      </Button>
    </div>
  );
};
export const SwitchDay = () => {
  const { state, setState, calendarDays, viewPort } = CalenderHook();

  const NextDay = () => {
    const next = addDays(state, 1);

    next.setHours(0);
    next.setMinutes(0);
    next.setSeconds(0);
    next.setMilliseconds(0); // beacuse their are (hours,min,seconds,etc) for the currDate but no for the CalenderDaysArray So There will be a
    // problem beacuse the last day of the next to be, will be the same for the last of the Array
    switch (viewPort) {
      case 1:
        {
          if (isAfter(next, calendarDays[41] as Date)) {
            return null;
          }
          setState(next);
        }
        break;
      case 2: {
        if (differenceInCalendarDays(calendarDays[41], next) < 6) {
          return null;
        }
        setState(next);
      }
      default:
        return;
    }
  };

  const PastDay = () => {
    const past = subDays(state, 1);

    if (isBefore(past, calendarDays.at(0) as Date)) {
      return null;
    }
    setState(past);
  };

  let editedDays = Array.from(Days);

  editedDays.shift();

  editedDays.push("Sat");

  return (
    <div className="flex items-center border rounded-md mx-2 dark:border-slate-800">
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800 "
        onClick={PastDay}
      >
        &lt;
      </Button>
      <div className="text-sm font-medium ">
        {editedDays.map((day, index) => {
          if (index === getDay(state)) {
            if (isToday(state))
              return (
                <p className="hidden sm:block" key={index}>
                  Today
                </p>
              );
            if (isTomorrow(state))
              return (
                <p className="hidden sm:block" key={index}>
                  Tomorrow
                </p>
              );
            if (isYesterday(state))
              return (
                <p className="hidden sm:block" key={index}>
                  Yesterday
                </p>
              );
            return day;
          }
        })}
      </div>
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={NextDay}
      >
        &gt;
      </Button>
    </div>
  );
};

export const AddEventButton = () => {
  return <AddEvent state />;
};

export const ExportAsCSV = ({table} :{table: Table<any>}) => {
  const data = table.getRowModel().rows.map((row) => {
    return [
      row.original.id,
      row.original.name,
      row.original.status,
      row.original.verified,
    ];
  });

  const headers = ['ID', 'Name', 'Status', 'Verified'];

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data,{header:["id","name","status","verified"]});
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' }); // Create a worksheet from JSON data
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // Add the worksheet to the workbook
        XLSX.writeFile(workbook, 'table_data.xlsx'); // Download the file
    }

    return <button onClick={handleExport}>Export to Excel</button>
}

export  const exportToPDF = (table: Table<any>) => {
  const doc = new jsPDF();

  // Add a title
  doc.text("Table", 4, 10);

  // Convert table data for jsPDF
  const tableData = table.getRowModel().rows.map((row) => {
    console.log(row.original);
    return [
      row.original.id,
      row.original.name,
      row.original.status,
      row.original.verified,
    ];
  });
  const tableHeaders = ["ID", "Name", "status", "verified"];

  // Add autoTable to the PDF
  doc.autoTable({
    head: [tableHeaders],
    body: tableData,
    startY: 20,
  });

  // Save the PDF
  doc.save("user-data.pdf");
};

