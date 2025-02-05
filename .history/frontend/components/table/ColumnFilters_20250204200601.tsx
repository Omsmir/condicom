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

          switch(columnId){
            case "gender":
                return (
                    columnId === "gender" && (
                      <Select
                        key={value}
                        onValueChange={(e) => {
                          setColumnFilterForGender(e,columnId)
                        }}
                        value={value ?? undefined}
                      >
                        <SelectTrigger className="shad-select-trigger text-dark-500 w-[145px] max-h-[30px]">
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
                              <p className="text-md text-gray-500 mx-2">Clear</p>
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
                  case "firstName":
                    return (
                        
                    )
                  default: return null
          }
      })}
    </div>
  );
};

export default ColumnFilters;
