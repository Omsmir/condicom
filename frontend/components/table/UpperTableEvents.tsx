import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ExportAsCSV, exportToPDF } from '../togglers/TopBarEvents';
import { ColumnDef, ColumnFiltersState, Table } from '@tanstack/react-table';
import AddPatient from '../AddPatient';
import ColumnFilters from './ColumnFilters';
import AddMedication from '../AddMedication';
import { Trash } from 'lucide-react';
import { DeleteHandler } from '../togglers/Handlers';
import { useSession } from 'next-auth/react';
import ImportMedications from '../pharmacy/AddMedication/ImportMedications';
import ImportPatients from '../patient/createPatient/ImportPatients';

interface UpperTableEventsProps<TData, TValue> {
    columns?: ColumnDef<TData, TValue>[] | any;
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    table: Table<any>;
    renderSwitchState?: string;
    selectedData: any[];
    dataName?: string;
}
const UpperTableEvents = <TData, TValue>({
    columns,
    columnFilters,
    setColumnFilters,
    table,
    renderSwitchState,
    selectedData,
    dataName,
}: UpperTableEventsProps<TData, TValue>) => {
    const { data: session } = useSession();
    const ButtonState = () => {
        switch (renderSwitchState) {
            case 'patient':
                return (
                    <div className="flex justify-between md:ml-4 md:border-l pl-4">
                        <ImportPatients />
                        <div className="ml-4">
                            <AddPatient />
                        </div>
                    </div>
                );
            case 'pharmacy':
                return (
                    <div className="flex justify-between md:ml-4 md:border-l pl-4">
                        <ImportMedications />
                        <div className="ml-4">
                            <AddMedication />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const isSelectedData = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-2">
            <div className="flex items-center mr-2 sm:m-0 p-4 sm:p-0 w-full">
                <ColumnFilters
                    columns={columns}
                    setColumnFilters={setColumnFilters}
                    columnFilters={columnFilters}
                />
            </div>
            <div className="flex justify-end  items-center p-4 sm:p-0 w-full ">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="my-1"
                    >
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
                        <DropdownMenuItem
                            className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-accent)] "
                            disabled={!isSelectedData}
                        >
                            <ExportAsCSV table={table} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer hover:bg-slate-200  dark:hover:bg-[var(--sidebar-accent)]"
                            onClick={() => exportToPDF(table)}
                            disabled={!isSelectedData}
                        >
                            Export as PDF
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ButtonState />
                {session?.user.role === 'Admin' && (
                    <DeleteHandler
                        apiString={`multiple-${dataName}`}
                        id={session?.user.id}
                        messagePopup={`do you want to delete the selected ${dataName}`}
                        disabled={!isSelectedData}
                        selectedData={selectedData}
                        table={table}
                    >
                        <Trash className="text-red-800" />
                    </DeleteHandler>
                )}
            </div>
        </div>
    );
};

export default UpperTableEvents;
