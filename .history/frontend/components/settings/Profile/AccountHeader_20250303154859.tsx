"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from '@/components/ui/button';
import { AccountHook } from '@/components/context/AccountProvider';



interface AccountReusebleHeaderProps {
  innerText:string;
  showMenu:boolean
}
const AccountReusebleHeader = ({innerText,showMenu}:AccountReusebleHeaderProps) => {
  const {ProfileEdit,setProfileEdit} = AccountHook()

  const setEditTrue = () => {
    setProfileEdit(true)
  }
  return (
    <div className="flex justify-between items-center p-4 w-full">
    <h1 className="text-lg font-semibold capitalize">{innertext}</h1>
   {}
  </div>
  )
}

export default AccountReusebleHeader
