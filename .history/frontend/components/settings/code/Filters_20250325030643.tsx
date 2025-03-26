"use client"
import React, { useState } from 'react'

import CustomFilter, { FilterTypes } from '@/components/CustomFilter';
import { Roles } from '@/lib/constants';

interface FiltersProps {
    name:string
    setName:React.Dispatch<React.SetStateAction<string>>
}
const Filters = ({name,setName}:FiltersProps) => {
  const [role,setRole] = useState<string>("")


  console.log(role)
  return (
    <div className="flex w-full justify-between items-center">
   
   <CustomFilter type={FilterTypes.SELECT} placeholder='role' setValue={setRole} classname='max-w-[225px]' SelectArray={Roles} />

    <div className="flex justify-center items-center">
     
    </div>
  </div>
  )
}

export default Filters
