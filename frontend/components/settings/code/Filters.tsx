"use client";
import React from "react";

import CustomFilter, { FilterTypes } from "@/components/CustomFilter";
import { Roles } from "@/lib/constants";

interface FiltersProps {
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<boolean | undefined>>;

}
const Filters = ({ setRole ,setState}: FiltersProps) => {
  return (
    <div className="flex w-full justify-between items-center">
      <CustomFilter
        type={FilterTypes.SELECT}
        placeholder="role"
        setValue={setRole}
        classname="max-w-[225px]"
        SelectArray={Roles}
      />
      <CustomFilter
        type={FilterTypes.SELECT}
        placeholder="state"
        setValue={setState}
        classname="max-w-[225px]"
        SelectArray={["used","not used"]}
      />

    </div>
  );
};

export default Filters;
