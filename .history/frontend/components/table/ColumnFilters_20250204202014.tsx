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
import { Input } from "../ui/input";

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
  const setColumnFilterForRows = ({
    e,
    columnId,
    switchValue,
  }: {
    e?: any;
    columnId: string;
    switchValue: string;
  }) => {
    switch (switchValue) {
      case "gender":
        return setColumnFilters((prev) =>
          e === "clear"
            ? prev.filter((ele) => ele.id !== columnId)
            : [
                ...prev.filter((ele) => ele.id !== columnId),
                { id: columnId, value: e },
              ]
        );
      case "input":
        return setColumnFilters((prev) => [
          ...prev.filter((ele) => ele.id !== columnId),
          { id: columnId, value: e.target.value },
        ]);
      default:
        return null;
    }
  };

  return (
    <div className="flex pl-0 p-2 ">
      {columns.map((column: any) => {
        const columnId = column.accessorKey;
        const value = columnFilters.find((f) => f.id === columnId)
          ?.value as string;

        switch (columnId) {
          case "gender":
            return (
              columnId === "gender" && (
                <Select
                  key={value}
                  onValueChange={(e) => {
                    setColumnFilterForRows({
                      e,
                      columnId,
                      switchValue: "gender",
                    });
                  }}
                  value={value ?? undefined}
                >
                  <SelectTrigger className="shad-select-trigger flex-1 text-dark-500 w-[145px] max-w-[250px] max-h-[30px]">
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
                <Input
                key={columnId}
             
                placeholder={`search by name`}
                value={value || ""}
                onChange={(e) => setColumnFilterForRows({e,columnId,switchValue:"input"})}
                className="shad-input max-h-[30px] mr-1"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ColumnFilters;
