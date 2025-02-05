"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  MoreHorizontal,
  ArrowUpDown,
  ClipboardList,
  PenTool,
  UserPen,
  Eye,
  House,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import clsx from "clsx";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { format } from "date-fns";
import { DeleteHandler } from "../togglers/Handlers";

export type Doctor = {
  _id: string;
  name: string;
  role: string;
  email: string;
  verified: boolean;
  activity?: Date;
  birthDate: Date | undefined;
  phone: string;
  profileImg: { url: string };
  occupation: string;
};

export const doctorColumns: ColumnDef<Doctor, any>[] = [
  {
    accessorKey: "name",
    header: () => <p className="text-slate-500">USER</p>,
    cell: ({ row }) => {
      const name = row.original.name;
      const occupation = row.original.occupation;
      return (
        <div className=" flex items-center font-medium">
        <div className="flex size-10 mr-2 rounded-full overflow-hidden ">
          <Image
            src={
              row.original.profileImg?.url || "/assets/images/dr-peter.png"
            }
            alt="profile"
            width={34}
            height={34}
            className="w-full h-full object-cover object-center"
          />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-medium capitalize">{name}</h1>
            <p className="text-[12px] text-slate-500">{occupation}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-[13px] text-slate-500">USER ROLE</p>
          <ArrowUpDown
            className={clsx("ml-2 h-4 w-4", {
              "text-blue-900": column.getIsSorted() === "asc",
            })}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <
      )
    },
  },
  {
    accessorKey: "email",
    header: () => <p className="text-slate-500">EMAIL</p>,
    cell: ({ row }) => {
      return <p className="text-slate-600">{row.getValue("email")}</p>;
    },
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
    accessorKey: "phone",
    header: () => <p className="text-slate-500">CONTACT</p>,
    cell: ({ row }) => {
      const phoneNumber = row.original.phone;
      return <p className="text-slate-500">{phoneNumber.split("+")}</p>;
    },
  },
  {
    accessorKey: "verified",
    header: () => <p className="text-slate-500">VERIFIED</p>,
    cell: ({ row }) => {
      const verified = row.getValue("verified");
      return verified ? (
        <div className="flex items-center justify-between px-4">
          <CheckCircleFilled className="text-green-700" />
        </div>
      ) : (
        <div className="flex items-center justify-between px-4">
          <CloseCircleFilled className="text-red-700" />
        </div>
      );
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
            <Link href={`/dashboard/doctors/${id}`}>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]">
                View
              </DropdownMenuItem>
            </Link>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
