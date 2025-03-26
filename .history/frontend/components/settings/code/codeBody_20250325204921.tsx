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
    if (codes.hasNextPage) {
      codes.fetchNextPage();
    }
  };

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
      if (code.role === role || code.used === used) {
        return code;
      }
    });
  };
  return (
    <div className="flex flex-col w-full mt-4 ">
      <div className="grid grid-cols-12">
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
      </div>
      <div className="flex items-center justify-center mt-4">
        <SubmitButton
          className=" bg-blue-800 text-slate-50 rounded-md "
          onclick={fetchNextPageFunc}
          disabled={!codes.hasNextPage}
          isLoading={codes.isFetchingNextPage}
        >
          load more
        </SubmitButton>
      </div>
    </div>
  );
};

export default CodeBody;
