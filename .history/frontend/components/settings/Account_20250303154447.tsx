"use client";
import { Divider } from "@mui/material";
import React from "react";

import { useSession } from "next-auth/react";
import { useGetUser } from "@/actions/queries";
import AccountHeader from "./Profile/AccountHeader";
import Department from "./Profile/department/Department";
import AccountInfoHolder from "./Profile/AccountInfoHolder";

const Account = () => {
  const { data: session } = useSession();

  const { data, isFetching } = useGetUser(session?.user.id);

  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      
         {/* Account Information */}
          <AccountInfoHolder
            user={data?.existingUser}
            isFetching={isFetching}
          />
        
       
      </div>
    </div>
  );
};

export default Account;
