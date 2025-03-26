"use client"
import React, { useState } from 'react'

import CustomFilter, { FilterTypes } from '@/components/CustomFilter';
import { Roles } from '@/lib/constants';

interface FiltersProps {
    name:string
    setRole:React.Dispatch<React.SetStateAction<string>>
}
const Filters = ({name,setRole}:FiltersProps) => {


  return (
    <div className="flex w-full justify-between items-center">
   
   <CustomFilter type={FilterTypes.SELECT} placeholder='role' setValue={setrole} classname='max-w-[225px]' SelectArray={Roles} />

    <div className="flex justify-center items-center">
     
    </div>
  </div>
  )
}

export default Filters
