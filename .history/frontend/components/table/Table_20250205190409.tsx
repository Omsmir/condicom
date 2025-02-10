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
  hiddenColumns?: ColumnDef<TData, TValue>[];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderSwitchState?: string;
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
  hiddenColumns,
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
    state: { pagination, sorting, globalFilter, columnFilters, expanded },
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

  console.log(hiddenColumns?.map((col:any) => col.accessorKey as any))
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
                      <TableCell
                        key={cell.id}
                        className="p-2 text-[12px] whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.getIsExpanded() && hiddenColumns && (
                    <React.Fragment>
                      <TableRow
                        key="table-header"
                        className="bg-[var(--sidebar-background)]"
                      >
                        {hiddenColumns?.map((column, index) => (
                          <TableHead
                            key={`header-${column.id}`}
                            className="text-[12px] px-2 whitespace-nowrap"
                          >
                          
                            {typeof column.header === "function"
                              ? column.header({} as any)
                              : column.header}
                          </TableHead>
                        ))}
                      </TableRow>
                      <TableRow key="table-cell" className="flex-1">
                        {row.getVisibleCells().map((cell) => {
                         const hiddenColumnsFilter = hiddenColumns.map((col:any) => col.accessorKey)
                       console.log(hiddenColumnsFilter)
                          return (
                            <TableCell
                              key={cell.id}
                              className="p-2 text-[12px] whitespace-nowrap"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
