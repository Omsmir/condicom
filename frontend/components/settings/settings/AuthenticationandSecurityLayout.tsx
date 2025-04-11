"use client";
import { Divider } from "antd";
import React from "react";

const AuthenticationandSecurityLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      <div className="flex justify-between items-center p-4 w-full">
        <h1 className="text-lg font-semibold capitalize">
          Authentication and security
        </h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0 w-full" />
      {children}
    </div>
  );
};

export default AuthenticationandSecurityLayout;
