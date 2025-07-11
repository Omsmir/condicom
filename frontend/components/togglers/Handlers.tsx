'use client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { prop } from '@/types';
import { DashboardHook } from '../context/Dashboardprovider';
import { useSession } from 'next-auth/react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import React from 'react';
import { CreateNotification, switchOnNotifications, userRole } from './TopBarEvents';
import {
    UseCreateNotification,
    UseDeleteAppointment,
    UseDeleteMedication,
    UseDeleteMultiplePatients,
    UseDeletePatient,
    UseUpdateAppointment,
} from '@/actions/mutation';
import { Table } from '@tanstack/react-table';

export const MyHandler = ({ id, name, className, state }: prop) => {
    const router = useRouter();

    const { api } = DashboardHook();
    const handleDelete = async () => {
        try {
            Swal.fire({
                title: 'Do you want to delete the product?',
                showDenyButton: true,
                denyButtonText: 'cancel',
                denyButtonColor: '#94a3b8',
                confirmButtonColor: '#dc3741',
                confirmButtonText: 'delete',
            }).then(async result => {
                if (result.isDenied) {
                    api.info({ message: "Changes Aren't Saved" });
                } else if (result.isConfirmed) {
                    const response = await axios.delete(
                        `http://localhost:8080/api/products/${id}/`
                    );

                    Swal.fire('deleted', '', 'success');

                    router.push('/dashboard'); // Redirect to the products page
                }
            });
        } catch (error: any) {
            api.error({
                message: 'Error Deleting Product',
                description: error.message,
            });
        }
    };

    const handleEdit = async () => {
        router.push(`/dashboard/products/${id}/edit`);
    };
    const stateManagement = () => {
        if (!state) return handleDelete();

        return handleEdit();
    };

    return (
        <Button
            className={className}
            onClick={stateManagement}
        >
            {name}
        </Button>
    );
};

type DeleteHandlerProps = {
    children?: React.ReactNode;
    className?: string;
    id: string | undefined;
    style?: string;
    tableState?: boolean;
    apiString: string;
    messagePopup: string;
    disabled?: boolean;
    selectedData?: any[];
    table?: Table<any>;
};
export const DeleteHandler = ({
    id,
    children,
    className,
    style,
    tableState,
    apiString,
    messagePopup,
    disabled,
    selectedData,
    table,
}: DeleteHandlerProps) => {
    const { api } = DashboardHook();
    const { data: session } = useSession();
    const router = useRouter()

    const deleteMedication = UseDeleteMedication(api);

    const deleteAppointment = UseDeleteAppointment(api);

    const deletePatient = UseDeletePatient(api);

    const createNotification = UseCreateNotification(api);

    const deleteMultiplePatients = UseDeleteMultiplePatients(api);

    const handleMulipleDeletions = () => {
        deleteMultiplePatients.mutate({
            idsArray: selectedData,
            id: id,
            query: '',
        });
        table?.resetRowSelection();
    }; // needs refactoring for scalability and reusability
    const handleApiDeletion = () => {
        switch (apiString) {
            case 'medications':
                return deleteMedication.mutate(id);
            case 'appointments':
                return deleteAppointment.mutate(id);
            case 'patient':
                return deletePatient.mutate(id);
            case 'multiple-patients':
                return handleMulipleDeletions();
            default:
                return null;
        }
    };
    const handleDelete = async () => {
        const notificationData = switchOnNotifications(apiString, session, id);

        try {
            Swal.fire({
                title: messagePopup,
                showDenyButton: true,
                denyButtonText: 'Cancel',
                denyButtonColor: '#94a3b8',
                confirmButtonColor: '#dc3741',
                confirmButtonText: 'Delete',
            }).then(async result => {
                if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info');
                } else if (result.isConfirmed) {
                    handleApiDeletion();

                    await createNotification.mutateAsync(notificationData);
                }
            });
        } catch (error: any) {
            api.error({
                message: error.message || 'Unexpected error',
                description: 'Something went wrong',
            });
        }
    };

    return (
        <React.Fragment>
            {tableState ? (
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]"
                >
                    Delete
                </DropdownMenuItem>
            ) : (
                <Button
                    className={className}
                    style={{ display: style }}
                    onClick={handleDelete}
                    disabled={disabled}
                >
                    {children}
                </Button>
            )}
        </React.Fragment>
    );
};

export interface data {
    state: boolean;
}

export const ToggleButton = ({ id, state }: { id: string | undefined; state: boolean }) => {
    const { api } = DashboardHook();

    const toggleAppointment = UseUpdateAppointment(api, id);

    const data = {
        state: state,
    };
    const onSubmit = async () => {
        try {
            await toggleAppointment.mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            onDoubleClick={onSubmit}
            className="hidden justify-center items-end py-2 text-center text-slate-50 text-[12px] normal absolute inset-0 opacity-65 edit"
        >
            {!state ? 'Completed' : 'Uncompleted'}
        </div>
    );
};
