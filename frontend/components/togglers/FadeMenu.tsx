"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalenderHook } from "../context/CalenderProvider";
type Checked = DropdownMenuCheckboxItemProps["checked"];

export function FadeMenu() {
  const [MonthView, setMonthView] = React.useState<Checked>(true);
  const [WeekView, setWeekView] = React.useState<Checked>(false);
  const [DayView, setDayView] = React.useState<Checked>(false);
  const { view, setView } = CalenderHook();

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:bg-slate-200">
          {view} <p className="-rotate-90">&lt;</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-slate-100">
        <DropdownMenuLabel className="text-center">
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="hover:bg-slate-200 cursor-pointer"
          checked={MonthView}
          onCheckedChange={() =>
            handleView({ text: "Month'view", onclick: setMonthView })
          }
        >
          Month'view
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-slate-200 cursor-pointer"
          checked={WeekView}
          onCheckedChange={() =>
            handleView({ text: "Week'view", onclick: setWeekView })
          }
        >
          Week'view{" "}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-slate-200 cursor-pointer"
          checked={DayView}
          onCheckedChange={() =>
            handleView({ text: "Day'view", onclick: setDayView })
          }
        >
          Day'view
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
