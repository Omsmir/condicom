"use client";
import { useGetCodes, useGetUser } from "@/actions/queries";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Filters from "./Filters";
import Spinner from "@/components/Spinner";
import { code } from "@/types";

const CodeLayout = () => {
  const { data: session } = useSession();

  const user = useGetUser(session?.user.id);

  const codes = useGetCodes(session?.user.id);

  const [name, setName] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-start col-span-12 mt-6">
      <Filters name={name} setName={setName} />
      <div className="grid grid-cols-12 w-full mt-4">
        {codes.isFetching ? (
          <Spinner size="small" className="absolute" />
        ) : codes.data ? (
          codes.data.pageParams.map((ele) => (
            <div className="flex" key={ele._id}>

            </div>
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
    </div>
  );
};

export default CodeLayout;
