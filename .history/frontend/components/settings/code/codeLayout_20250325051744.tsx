"use client";
import { useGetCodes, useGetUser, UseGetUsers } from "@/actions/queries";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Filters from "./Filters";

import CodeBody from "./codeBody";

const CodeLayout = () => {
  const { data: session } = useSession();

  const user = UseGetUsers(session?.user.id);

  const codes = useGetCodes(session?.user.id);

  const [role, setRole] = useState<string>("");
  const [used,setUsed] = useState<boolean | undefined>(undefined);

  console.log(role)

  return (
    <div className="flex flex-col justify-center items-start col-span-12 mt-6 ">
      <Filters  setState={setued} setRole={setRole} />
       <CodeBody role={role}  users={user.data?.users} codes={codes} used={used}  />
    </div>
  );
};

export default CodeLayout;
