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
import { patient } from "@/types";
import { DeleteHandler } from "../togglers/Handlers";

const fullNameFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const firstName = row.original.firstName.toLowerCase();
  const lastName = row.original.lastName.toLowerCase();
  const fullName = `${firstName} ${lastName}`;

  return (
    firstName.includes(filterValue.toLowerCase()) ||
    lastName.includes(filterValue.toLowerCase()) ||
    fullName.includes(filterValue.toLowerCase())
  );
};

export const patientsColumns: ColumnDef<patient>[] = [
  {
    accessorKey: "firstName",
    header: () => <p className="text-slate-500 uppercase">Patient</p>,
    cell: ({ row }) => {
      const firstname = row.original.firstName;
      const lastname = row.original.lastName;

      const name = `${firstname} ${lastname}`;
      const profileImg = row.original.profileImg;
      return (
        <div className=" flex items-center font-medium">
          <div className="flex size-10 mr-2 rounded-full overflow-hidden ">
            <Image
              src={
                (profileImg && profileImg.url) || "/assets/images/dr-peter.png"
              }
              alt="profile"
              width={34}
              height={34}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="font-medium capitalize">{name}</p>
        </div>
      );
    },
    filterFn:fullNameFilter
  },
  {
    accessorKey: "birthDate",
    header: () => <p className="text-slate-500">BIRTH</p>,
    cell: ({ row }) => {
      const BirthDate = format(row.original.birthDate as Date, "P");
      return <p className="text-slate-500">{BirthDate}</p>;
    },
  },
  {
    accessorKey: "gender",
    header: () => <p className="text-slate-500">GENDER</p>,
    cell: ({ row }) => {
      const gender = row.original.gender;
      return <p className="text-slate-600 dark:text-slate-50">{gender}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: () => <p className="text-slate-500">CONTACT</p>,
    cell: ({ row }) => {
      const phoneNumber = row.original.phone;
      const email = row.original.email;

      return (
        <div className="flex flex-col items-start">
          <p className="text-slate-500">{phoneNumber.split("+2")}</p>
          <p className="text-blue-700 dark:text-slate-50">
            {email ? email : "not assigned"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: () => <p className="text-slate-500">COUNTRY & ADDRESS</p>,
    cell: ({ row }) => {
      const country = row.original.country;
      const address = row.original.residentialAddress;
      return (
        <div className="flex flex-col items-start">
          <p className="text-blue-700 dark:text-slate-50">{country}</p>
          <p className="text-slate-600">
            {address ? address : "not mentioned"}
          </p>
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
