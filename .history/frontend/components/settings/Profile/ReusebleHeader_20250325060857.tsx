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
import Dropdown from "../Dropdown";

interface AccountReusebleHeaderProps {
  innerText: string;
  showMenu?: boolean;
  editState?: boolean;
  setEditState?: React.Dispatch<React.SetStateAction<boolean>>;
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
    if (setEditState) {
      setEditState(true);
    }
    if (setAnyState) {
      setAnyState(false);
    }
  };
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <h1 className="text-lg font-semibold capitalize">{innerText}</h1>
      {showMenu && (
       <Dropdown innerText="edit" onclick={seted} />
      )}
    </div>
  );
};

export default AccountReusebleHeader;
