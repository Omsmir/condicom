"use client";
import { useGetCodes, useGetUser } from "@/actions/queries";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Filters from "./Filters";
import Spinner from "@/components/Spinner";
import { code } from "@/types";
import CodeBody from "./codeBody";

const CodeLayout = () => {
  const { data: session } = useSession();

  const user = useGetUser(session?.user.id);

  const codes = useGetCodes(session?.user.id,6);

  console.log(codes.data?.pages)
  const [name, setName] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-start col-span-12 mt-6">
      <Filters name={name} setName={setName} />
       <CodeBody user={user} />
    </div>
  );
};

export default CodeLayout;
