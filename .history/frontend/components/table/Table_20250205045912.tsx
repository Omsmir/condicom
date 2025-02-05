"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import UpperTableEvents from "./UpperTableEvents";
import dynamic from "next/dynamic";

const DynamicStats = dynamic(() => import("./Stats"));
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] ;
  data: TData[];
  renderSwitchState?:string
  breadCrumbString?: string;
  StatsIcon?: React.ReactNode;
  message?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderSwitchState,
  breadCrumbString,
  StatsIcon,
  message,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting, globalFilter, columnFilters,expanded  },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true, 
  });


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

   
      {/* Table Controls */}
      <UpperTableEvents
        table={table}
        renderSwitchState={renderSwitchState}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
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
    <React.Fragment key={row.id}>
      {/* Main Table Row */}
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className="bg-[var(--sidebar-background)] hover:bg-slate-200 dark:border-[var(--sidebar-accent)] dark:hover:bg-[var(--sidebar-accent)] cursor-pointer"
        onClick={() => row.toggleExpanded()}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="p-2 text-[12px] whitespace-nowrap">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      {/* Expanded Row - Only Show Hidden Data */}
      {row.getIsExpanded() && (
   
   <TableRow key="table-header" className="flex-1">
   {columns.map((column, index) => (
     <TableHead
       key={column.id || column.accessorKey || `column-${index}`} // Ensure a unique key
       className="text-[12px] px-2 whitespace-nowrap"
     >
       {typeof column.header === "function" ? column.header({}) : column.header}
     </TableHead>
   ))}
 </TableRow>
      )}
    </React.Fragment>
    /* {hiddenColumns.map((col) => (
                <div key={col.accessorKey} className="flex">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {col.header}:&nbsp;
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {row.original[col.accessorKey] || "N/A"}
                  </span>
                </div>
              ))} */
  ))
) : (
  <TableRow>
    <TableCell colSpan={columns.length} className="h-24 text-center">
      No data
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
