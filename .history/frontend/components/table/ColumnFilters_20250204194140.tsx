"use client"
import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import { cn } from "@/lib/utils";
  import { gender, genders } from "@/lib/constants";
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
  


  interface ColumnFiltersProps<TData,TValue> {
    columns: ColumnDef<TData,TValue>[] | any
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  }
const ColumnFilters = ({}:ColumnFiltersProps) => {
  return (
    <div className="flex gap-4 p-2">
    {columns.map((column: any) => {
      const columnId = column.accessorKey;
      const value = columnFilters.find((f) => f.id === columnId)
        ?.value as string;
      return (
        columnId === "gender" && (
          <Select
            onValueChange={(e) => {
              setColumnFilters(
                (prev) =>
                  e === "clear"
                    ? prev.filter((f) => f.id !== columnId)
                    : [
                        ...prev.filter((f) => f.id !== columnId),
                        { id: columnId, value: e },
                      ]
                // Remove filter if empty
              );
            }}
            value={value ?? undefined}
          >
            <SelectTrigger className="shad-select-trigger text-dark-500 max-w-[145px]">
              <SelectValue placeholder={"gender filter"} />
            </SelectTrigger>
            <SelectContent
              className={cn("shad-select-content max-h-[250px]")}
            >
              <SelectItem
                value="clear"
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex justify-center items-center">
                  <p className="text-md text-gray-500 mx-2">Clear Filter</p>
                </div>
              </SelectItem>
              {genders.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value}
                  className="cursor-pointer transition-colors hover:bg-slate-200 "
                >
                  <div className="flex justify-center items-center">
                    <p className="text-md text-black mx-2">{value}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      );
    })}
  </div>

  )
}

export default ColumnFilters
