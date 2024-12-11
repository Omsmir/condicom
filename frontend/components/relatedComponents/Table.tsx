"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as tabless,
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
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ExportAsCSV, exportToPDF } from "../togglers/TopBarEvents";
import { count } from "console";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting, globalFilter, columnVisibility },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const isTablet = useMediaQuery({ query: "(min-width: 997px)" });
  const isMobile = useMediaQuery({ query: "(min-width: 640px)" });

  const changeColumnVisibilityBasedOnMedia = () => {
    table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => {
        if(!isTablet){
          if(column.id.startsWith("email") || column.id.startsWith("status")){
            column.toggleVisibility(false)
          }
        }else {
          column.toggleVisibility(true)
        }
      });
  };

  useEffect(() => {
    changeColumnVisibilityBasedOnMedia()
  },[isTablet])
  return (
    <div className="pt-14 h-screen">
      <div className="flex justify-between items-center p-2">
        <div className="flex">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-60 border border-gray-300 rounded"
          />
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="my-1">
              <Button variant="outline" className="bg-blue-700 text-slate-50">
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-100">
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200">
                <ExportAsCSV table={table} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-slate-200"
                onClick={() => exportToPDF(table)}
              >
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Table */}

      <div
        className="rounded-md border border-l-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      >
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-100 cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center ml-2">
            <p className="text-sm text-slate-600"> Go to page:</p>
            <Input
              type="number"
              min={1}
              max={table.getPageCount()}
              defaultValue={pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-20 mx-2 text-sm"
            />
          </span>
          <span className="flex text-sm">
            {pagination.pageIndex + 1}{" "}
            <p className="text-slate-600 mx-1"> of </p> {table.getPageCount()}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}
