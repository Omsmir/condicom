"use client";

import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum FilterTypes {
  SELECT = "select",
  SEARCH = "search",
}

interface CustomFilterProps {
  type: FilterTypes;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  classname?:string;
  SelectArray?: string[];
}
const CustomFilter = (props: CustomFilterProps) => {
  switch (props.type) {
    case FilterTypes.SELECT:
      return (
        <Select onValueChange={(e) => props.setValue(e)}>
          <SelectTrigger className={cn("shad-select-trigger text-slate-500 max-h-[35px]",props.cla)}>
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent className="shad-select-content ">
            {props.SelectArray &&
              props.SelectArray.map((value) => (
                <SelectItem
                  value={value}
                  key={value}
                  className="transition-all cursor-pointer hover:bg-slate-200 w-full"
                >
                  <div className="flex">
                    <p className="text-black lowercase">{value}</p>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      );
    default:
      return null;
  }
};

export default CustomFilter;
