"use client";
import { useGetCodes, useGetUser } from "@/actions/queries";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Filters from "./Filters";
import Spinner from "@/components/Spinner";

const CodeLayout = () => {
  const { data: session } = useSession();

  const user = useGetUser(session?.user.id);

  const codes = useGetCodes(session?.user.id);

  const [name, setName] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-start col-span-12 mt-6">
      <Filters name={name} setName={setName} />
      <div className="grid grid-cols-12 w-full mt-4">
        {codes.isFetching ? <Spinner size="small" /> : codes.data  }
      </div>
    </div>
  );
};

export default CodeLayout;
