"use client"

import React from 'react'



export enum FilterTypes {
    SELECT = "select",
    SEARCH = "search"
}

interface CustomFilterProps {
    type:string;
    placeholder:string;
    value:string;
    setValue:React.Dispatch<React.SetStateAction<string>>
}
const CustomFilter = ({props}:{props:CustomFilterProps}) => {
  return (
    <div>
      
    </div>
  )
}

export default CustomFilter
