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
import SelectFilter from "./SelectFilter";

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
      case "bloodType":  
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
              <SelectFilter value={value ?? undefined}  array={genders} columnId={columnId} />
            );

          case "firstName":
            return (
              <Input
                key={columnId}
                placeholder={`filter by ${
                  columnId === "firstName" ? "name" : columnId
                }`}
                value={value || ""}
                onChange={(e) =>
                  setColumnFilterForRows({ e, columnId, switchValue: "input" })
                }
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
