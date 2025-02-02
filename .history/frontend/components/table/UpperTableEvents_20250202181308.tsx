import React from 'react'
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from '../ui/button';
import { ExportAsCSV, exportToPDF } from "../togglers/TopBarEvents";
import { Table } from '@tanstack/react-table';
import AddPatient from '../AddPatient';

interface UpperTableEventsProps {
    globalFilter: string
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
    table:Table<any>;
    patientButtonState?:boolean
}
const UpperTableEvents = ({globalFilter,setGlobalFilter,table,patientButtonState}:UpperTableEventsProps) => {
  return (
    <div className="flex justify-between items-center p-2">
        <div className="flex">
          <Input
            placeholder="Search by name"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className=" focus:outline-0  shad-input "
          />
        </div>
        <div className="flex justify-between items-center">
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="my-1">
              <Button
                variant="outline"
                className="bg-blue-700 text-slate-50 border-0"
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
          {patientButtonState && <AddPatient />}
        </div>
      </div>
  )
}

export default UpperTableEvents
