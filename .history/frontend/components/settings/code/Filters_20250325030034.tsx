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
import CustomFilter from '@/components/CustomFilter';

interface FiltersProps {
    name:string
    setName:React.Dispatch<React.SetStateAction<string>>
}
const Filters = ({name,setName}:FiltersProps) => {
  return (
    <div className="flex w-full justify-between items-center">
   
   <CustomFilter  t />

    <div className="flex justify-center items-center">
     
    </div>
  </div>
  )
}

export default Filters
