"use client";

import { codeInterface } from "@/actions/Codes";
import Spinner from "@/components/Spinner";
import { code,  UserInformation } from "@/types";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import SingleCode from "./SingleCode";

type CodeBodyProps = {
  codes: UseInfiniteQueryResult<InfiniteData<codeInterface, unknown>, Error>;
  users: UserInformation[] | undefined;
  role?: string;
};
const CodeBody = ({ codes, users, role }: CodeBodyProps) => {
    const appliedFilter = (codes:code[],filter:keyof code ,filterValue:string) => {
       return codes.filter((code) => code[`${filter}`] === filterValue)
    }
  return (
    <div className="grid grid-cols-12 w-full mt-4 ">
      {codes.isFetching ? (
        <Spinner size="small" className="col-span-12 relative" />
      ) : codes.data ? (
        codes.data.pages.map((ele) =>(
            appliedFilter(codes,"role",).map((code) => (
                <SingleCode
                code={code}
                key={code._id}
                users={users}
                isLoading={codes.isFetching}
              />
            ))
        ))
      ) : codes.isError ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-slate-600 text-sm font-medium capitalize">
            {codes.error.message}
          </p>
        </div>
      ) : (
        "no data"
      )}
    </div>
  );
};

export default CodeBody;
