"use client";
import { useGetCodes, useGetUser, UseGetUsers } from "@/actions/queries";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Filters from "./Filters";
import Spinner from "@/components/Spinner";
import { code } from "@/types";
import CodeBody from "./codeBody";

const CodeLayout = () => {
  const { data: session } = useSession();

  const user = UseGetUsers(session?.user.id);

  const codes = useGetCodes(session?.user.id);

  const [role, setRole] = useState<string>("");


  console.log(role)

  return (
    <div className="flex flex-col justify-center items-start col-span-12 mt-6 ">
      <Filters role={role} setRole={setRole} />
       <CodeBody  users={user.data?.users} codes={codes}  />
    </div>
  );
};

export default CodeLayout;
