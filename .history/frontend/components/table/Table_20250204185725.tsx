"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useMediaQuery } from "react-responsive";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import UpperTableEvents from "./UpperTableEvents";
import BreadCrumb from "../doctorProfile/BreadCrumb";
import dynamic from "next/dynamic";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { gender, genders } from "@/lib/constants";

const DynamicStats = dynamic(() => import("./Stats"))
interface DataTableProps<TData, TValue > {
  columns: ColumnDef<TData, TValue>[] | any;
  data: TData[];
  patientTableState?: boolean;
  breadCrumbString?: string;
  StatsIcon?: React.ReactNode;
  message?:string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  patientTableState,
  breadCrumbString,
  StatsIcon,
  message
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const[columnFilters,setColumnFilters] = useState<ColumnFiltersState>([])


  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting, globalFilter ,columnFilters},
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange:setColumnFilters
  });

  const editedGenders = [...genders]

  editedGenders.push("")

  return (
    <div className="pt-14 min-h-screen w-full px-2 sm:px-0">
    {/* Table Wrapper */}
    <div className="flex flex-col sm:flex-row justify-between items-start">
      <DynamicStats
        StatsSection={breadCrumbString}
        StatsIcon={StatsIcon}
        data={data}
      />
    </div>
  
    <div className="mb-4 flex gap-4">
        {columns.map((column:any) => {
          const columnId = column.accessorKey 
        const value = columnFilters.find((f) => f.id === columnId)?.value as string
          return columnId === "gender" && (
            <Select  onValueChange={(e) =>
              setColumnFilters((prev) => [
                ...prev.filter((f) => f.id !== columnId),
                { id: columnId, value: e },
              ])} value={value || ""}>
              <SelectTrigger className="shad-select-trigger text-dark-500 max-w-[145px]">
                <SelectValue placeholder={"gender filter"} />
              </SelectTrigger>
            <SelectContent className={cn("shad-select-content")}>
            {editedGenders.map((value, index) => (
              <SelectItem
                key={index}
                value={value}
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex justify-center items-center">
                  <p className="text-md text-black mx-2">{value || "All"}</p>
                </div>
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
          )
        })}
      </div>

    {/* Table Controls */}
    <UpperTableEvents
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      patientButtonState={patientTableState === true && true}
    />
  
    {/* Table Container */}
    <div className="rounded-md border border-l-0 border-[var(--sidebar-background)] overflow-x-auto">
      <Table>
        <TableHeader className="bg-[var(--sidebar-background)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-[12px] px-2 whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="bg-[var(--sidebar-background)] hover:bg-slate-200 dark:border-[var(--sidebar-accent)] dark:hover:bg-[var(--sidebar-accent)] cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="p-2 text-[12px]  whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {message}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  
    {/* Pagination */}
    <Pagination
      props={{
        table,
        pagination,
      }}
    />
  </div>
  
  );
}
