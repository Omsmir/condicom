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
        <div className="flex">
          {pati}
        </div>
      </div>
  )
}

export default UpperTableEvents
