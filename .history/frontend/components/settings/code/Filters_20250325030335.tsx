"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomFilter, { FilterTypes } from '@/components/CustomFilter';

interface FiltersProps {
    name:string
    setName:React.Dispatch<React.SetStateAction<string>>
}
const Filters = ({name,setName}:FiltersProps) => {
  const [role,setRole] = useState<string>("")
  return (
    <div className="flex w-full justify-between items-center">
   
   <CustomFilter type={FilterTypes.SELECT} placeholder='role' setValue={setRole} classname='' />

    <div className="flex justify-center items-center">
     
    </div>
  </div>
  )
}

export default Filters
