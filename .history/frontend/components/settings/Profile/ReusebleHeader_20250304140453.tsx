"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountHook } from "@/components/context/AccountProvider";

interface AccountReusebleHeaderProps {
  innerText: string;
  showMenu?: boolean;
  editState?: boolean;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setAnyState?: React.Dispatch<React.SetStateAction<boolean>>;
}
const AccountReusebleHeader = ({
  innerText,
  showMenu,
  editState,
  setEditState,
  setAnyState,
}: AccountReusebleHeaderProps) => {
  const setEditTrue = () => {
    setEditState(true);
    if (setAnyState) {
      setAnyState(false);
    }
  };
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <h1 className="text-lg font-semibold capitalize">{innerText}</h1>
      {showMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-100 dark:bg-[var(--sidebar-accent)] p-0 border-0"
          >
            <DropdownMenuItem
              className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]"
              onClick={setEditTrue}
              disabled={editState}
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AccountReusebleHeader;
