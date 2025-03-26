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


  const fetchNextPage

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
      {codes.isFetching ? (
        <Spinner size="small" className="col-span-12 relative" />
      ) : codes.data ? (
        codes.data.pages.map((ele) => {
          return appliedFilter(ele.codes, "role", role).map((code) => (
            <SingleCode
              code={code}
              key={code._id}
              users={users}
              isLoading={codes.isFetching}
            />
          ));
        })
      ) : codes.isError ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-slate-600 text-sm font-medium capitalize">
            {codes.error.message}
          </p>
        </div>
      ) : (
        "no data"
      )}
       {(
        <SubmitButton
          className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md disabled:opacity-50"
          onClick={() => codes.fetchNextPage()}
          disabled={codes.isFetchingNextPage || !codes.hasNextPage}
        >
          {codes.isFetchingNextPage ? "Loading..." : "Load More"}
        </SubmitButton>
      )}
    </div>
  );
};

export default CodeBody;
