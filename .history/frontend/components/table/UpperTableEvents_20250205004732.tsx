import React from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ExportAsCSV, exportToPDF } from "../togglers/TopBarEvents";
import { ColumnDef, ColumnFiltersState, Table } from "@tanstack/react-table";
import AddPatient from "../AddPatient";
import ColumnFilters from "./ColumnFilters";

interface UpperTableEventsProps<TData, TValue> {
  columns?: ColumnDef<TData, TValue>[] | any;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  table: Table<any>;
  renderSwitchState?: string;
}
const UpperTableEvents = <TData, TValue>({
  columns,
  columnFilters,
  setColumnFilters,
  table,
  renderSwitchState,
}: UpperTableEventsProps<TData, TValue>) => {
  const ButtonState = () => {
    switch (renderSwitchState) {
      case "patient":
        return (
          <div className="ml-4 border-l pl-4">
            <AddPatient />
          </div>
        );
        case "pharmacy":
      default:
        return null;
    }
  };
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center mr-2 sm:m-0">
        <ColumnFilters
          columns={columns}
          setColumnFilters={setColumnFilters}
          columnFilters={columnFilters}
        />
      </div>
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="my-1">
            <Button
              variant="outline"
              className="bg-blue-700 text-slate-50 border-0 AppointmentCreate"
            >
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[var(--sidebar-background)] border-0"
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-accent)] ">
              <ExportAsCSV table={table} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-slate-200  dark:hover:bg-[var(--sidebar-accent)]"
              onClick={() => exportToPDF(table)}
            >
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ButtonState />
      </div>
    </div>
  );
};

export default UpperTableEvents;
