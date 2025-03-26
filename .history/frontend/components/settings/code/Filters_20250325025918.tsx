"use client"
import React from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
    name:string
    setName:React.Dispatch<React.SetStateAction<string>>
}
const Filters = ({name,setName}:FiltersProps) => {
  return (
    <div className="flex w-full justify-between items-center">
    <Input
      name={name}
      onChange={(e) => setName(e.target.value)}
      className="shad-input max-w-[220px] max-h-[35px]"
      placeholder="role"
    />

    <div className="flex justify-center items-center">
     
    </div>
  </div>
  )
}

export default Filters
