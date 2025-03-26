"use client"

import React from 'react'



export enum FilterTypes {
    SELECT = "select",
    SEARCH = "search"
}

interface CustomFilterProps {
    type:string;
    placeholder:string;
    name:string;
    setValue
}
const CustomFilter = () => {
  return (
    <div>
      
    </div>
  )
}

export default CustomFilter
