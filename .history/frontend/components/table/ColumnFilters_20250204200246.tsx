"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { genders } from "@/lib/constants";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

interface ColumnFiltersProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] | any;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}
const ColumnFilters = <TData, TValue>({
  columns,
  columnFilters,
  setColumnFilters,
}: ColumnFiltersProps<TData, TValue>) => {
  const setColumnFilterForGender = (e: any, columnId: string) => {
    return setColumnFilters((prev) =>
      e === "clear"
        ? prev.filter((ele) => ele.id !== columnId)
        : [
            ...prev.filter((ele) => ele.id !== columnId),
            { id: columnId, value: e },
          ]
    );
  };

  return (
    <div className="flex p-2 ">
      {columns.map((column: any) => {
        const columnId = column.accessorKey;
        const value = columnFilters.find((f) => f.id === columnId)
          ?.value as string;

          switch(colu){

          }
      })}
    </div>
  );
};

export default ColumnFilters;
