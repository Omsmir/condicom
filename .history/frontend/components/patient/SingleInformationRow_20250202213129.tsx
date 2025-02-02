"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SingleInformationRowProps {
  children: React.ReactNode;
  className?:string
}
const SingleInformationRow = () => {
  return (
    <h1 className={cn("relative uppercase font-medium text-sm p-2 border-l-2 border-black dark:border-slate-50")}></h1>
  );
};

export default SingleInformationRow;
