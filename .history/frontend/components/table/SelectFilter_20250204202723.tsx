import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";

  interface SelectFilterProps {
    
  }
const SelectFilter = () => {
  return (
    <Select
    key={value}
    onValueChange={(e) => {
      setColumnFilterForRows({
        e,
        columnId,
        switchValue: "gender",
      });
    }}
    value={value ?? undefined}
  >
    <SelectTrigger className="shad-select-trigger text-dark-500  max-h-[30px]">
      <SelectValue placeholder={"gender filter"} />
    </SelectTrigger>
    <SelectContent
      className={cn("shad-select-content max-h-[250px]")}
    >
      <SelectItem
        value="clear"
        className="cursor-pointer transition-colors hover:bg-slate-200"
      >
        <div className="flex justify-center items-center">
          <p className="text-md text-gray-500 mx-2">Clear</p>
        </div>
      </SelectItem>
      {genders.map((value, index) => (
        <SelectItem
          key={index}
          value={value}
          className="cursor-pointer transition-colors hover:bg-slate-200 "
        >
          <div className="flex justify-center items-center">
            <p className="text-md text-black mx-2">{value}</p>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  )
}

export default SelectFilter
