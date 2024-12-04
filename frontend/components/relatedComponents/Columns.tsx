"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  CircleCheck,
  CircleX,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import clsx from "clsx";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  country?: {
    name: string;
    code: string;
  };
  company?: string;
  date?: string;
  verified: boolean;
  activity?: number;
  representative: {
    name: string;
    image: string;
  };
  balance: number;
  status: "Active" | "Inactive";
  userRole: "Administrator" | "Specialist" | "Nurse" | "Residant" | "Secretary";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
        className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-slate-500">ID</p>
          <ArrowUpDown
            className={clsx("ml-2 h-4 w-4", {
              "text-blue-900": column.getIsSorted() === "asc",
            })}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-slate-600">{row.original.id}</p>;
    },
  },
  {
    accessorKey: "name",
    header: () => <p className="text-slate-500">USER</p>,
    cell: ({ row }) => (
      <Link
        href={`/users/${row.original.id}`}
        className="flex items-center text-blue-500"
      >
        <Image
          src={"/assets/images/dr-lee.png"}
          alt="profile"
          width={34}
          height={34}
          className="mr-2 rounded-full"
        />
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "userRole",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-slate-500">USER ROLE</p>
          <ArrowUpDown
            className={clsx("ml-2 h-4 w-4", {
              "text-blue-900": column.getIsSorted() === "asc",
            })}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.original.userRole;
      switch (role) {
        case "Administrator":
          return (
            <div className="flex items-center rounded-md py-1 px-2 bg-blue-100 w-fit">
              <ClipboardList className="text-blue-700 mr-1" size={14} />
              <p className="text-blue-700 text-[13px] ">Administrator</p>
            </div>
          );
        case "Specialist":
          return (
            <div className="flex items-center rounded-md py-1 px-2 bg-purple-100 w-fit">
              <PenTool className="text-purple-700 mr-1" size={14} />
              <p className="text-purple-700 text-[13px] ">Specialist</p>
            </div>
          );
        case "Nurse":
          return (
            <div className="flex items-center rounded-md py-1 px-2 bg-cyan-100 w-fit">
              <UserPen className="text-cyan-700 mr-1" size={14} />
              <p className="text-cyan-700 text-[13px] ">Nurse</p>
            </div>
          );
        case "Residant":
          return (
            <div className="flex items-center rounded-md py-1 px-2 bg-green-100 w-fit">
              <House className="text-green-700 mr-1" size={14} />
              <p className="text-green-700 text-[13px] ">Residant</p>
            </div>
          );
        case "Secretary":
          return <div className="text-indigo-500">Secretary</div>;
        default:
          return (
            <div className="flex items-center rounded-md py-1 px-2 bg-slate-100 w-fit">
              <Eye className="text-slate-700 mr-1" size={14} />
              <p className="text-slate-700 text-[13px] ">User</p>
            </div>
          );
      }
    },
  },
  {
    accessorKey: "status",
    header: () => <p className="text-slate-500">STATUS</p>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      switch (status) {
        case "Active":
          return (
            <div className="flex items-center">
              <span className="size-2 rounded-full bg-green-700"></span>
              <p className="ml-2">Active</p>
            </div>
          );
        case "Inactive":
          return (
            <div className="flex items-center">
              <span className="size-2 rounded-full bg-red-700"></span>
              <p className="ml-2">Inactive</p>
            </div>
          );

        default:
          return <div>Unknown</div>;
      }
    },
  },
  {
    accessorKey: "verified",
    header: () => <p className="text-slate-500">VERIFIED</p>,
    cell: ({ row }) => {
      const verified = row.getValue("verified");
      return verified ? (
        <CircleCheck className="text-green-700" />
      ) : (
        <CircleX className="text-red-700" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-100">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-slate-200"
              onClick={() => navigator.clipboard.writeText(id.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-200">
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-200">
              View payment details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
