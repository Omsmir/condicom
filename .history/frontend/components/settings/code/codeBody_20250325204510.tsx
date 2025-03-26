"use client";

import { codeInterface } from "@/actions/Codes";
import Spinner from "@/components/Spinner";
import { code, UserInformation } from "@/types";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import SingleCode from "./SingleCode";
import SubmitButton from "@/components/togglers/SubmitButton";

type CodeBodyProps = {
  codes: UseInfiniteQueryResult<InfiniteData<codeInterface, unknown>, Error>;
  users: UserInformation[] | undefined;
  role: string;
  used: boolean | undefined;
};

interface codeFilters {
  role: string | undefined;
  used: boolean | undefined;
}
const CodeBody = ({ codes, users, role, used }: CodeBodyProps) => {


  const fetchNextPageFunc = () => {
    if(codes.hasNextPage){
      codes.fetchNextPage()
    }
  }

  const Filters: Record<keyof codeFilters, any> = {
    role,
    used,
  };

  const appliedFilter = (
    codes: code[],
    filter: keyof code,
    filterValue: string | undefined
  ) => {
    return codes.filter((code) => {
      if (filterValue === "clear" || filterValue === "") {
        return code;
      }
      if(code.role === role || code.used === used){
        return code
      }
    });
  };
  return (
    <div className="grid grid-cols-12 w-full mt-4 ">
   
      
    </div>
  );
};

export default CodeBody;
