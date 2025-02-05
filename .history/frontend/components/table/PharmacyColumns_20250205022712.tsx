"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { format } from "date-fns";
import { medication } from "@/types";
import { DeleteHandler } from "../togglers/Handlers";

export const patientsColumns: ColumnDef<medication, any>[] = [
  {
    accessorKey: "_id",
    header: () => <p className="text-slate-500 uppercase">id</p>,
    cell: ({ row }) => {
      const ID = row.original._id;

      return (
        <div className=" flex items-start ">
          <p className="font-medium capitalize">{ID}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <p className="text-slate-500 uppercase"> name</p>,
    cell: ({ row }) => {
      const name = row.original.name;

      return (
        <div className=" flex items-start ">
          <p className="font-medium capitalize">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "expiryDate",
    header: () => <p className="text-slate-500 uppercase">expiry date</p>,
    cell: ({ row }) => {
      const expiryDate = format(row.original.expiryDate as Date, "P");
      return <p className="text-slate-500">{expiryDate}</p>;
    },
  },
  {
    accessorKey: "generic_name",
    header: () => <p className="text-slate-500 uppercase">generic name</p>,
    cell: ({ row }) => {
      const generic_name = row.original.generic_name;

      return (
        <div className="flex items-start">
          <p className="text-slate-500">{generic_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "form",
    header: () => <p className="text-slate-500 uppercase">form</p>,
    cell: ({ row }) => {
      const form = row.original.form;
     
      return (
        <div className="flex  items-start">
          <p className="text-blue-700 dark:text-slate-50">{form}</p>
         
        </div>
      );
    },
  },
  {
    accessorKey: "bloodType",
    header: () => <p className="text-slate-500">BLOOD TYPE</p>,
    cell: ({ row }) => {
      const bloodType = row.original.bloodType;
      return <p className="text-slate-600 dark:text-slate-50 ">{bloodType}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <p className="text-slate-500">CREATED AT</p>,
    cell: ({ row }) => {
      const createdAt = format(row.original.createdAt, "P");
      return <p className="text-slate-600 dark:text-slate-50">{createdAt}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <p className="text-slate-500">UPDATED AT</p>,
    cell: ({ row }) => {
      const updatedAt = format(row.original.updatedAt, "P");
      return <p className="text-slate-600 dark:text-slate-50">{updatedAt}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-100 dark:bg-[var(--sidebar-accent)] p-0 border-0"
          >
            <Link href={`/dashboard/patients/${id}`}>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]">
                View
              </DropdownMenuItem>
            </Link>
            <DeleteHandler
              id={id}
              apiString="patient"
              messagePopup="do you want to delete the patient"
              className="absolute text-slate-50 right-0 hidden hover:text-red-800 transition-colors delete"
              name="delete"
              patientState
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
