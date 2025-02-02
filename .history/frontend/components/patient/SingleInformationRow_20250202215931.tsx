"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SingleInformationRowProps {
  children: React.ReactNode;
  className?: string;
  innerText: string;
}
// border-l-2 border-black dark:border-slate-50
const SingleInformationRow = ({
  children,
  className,
  innerText,
}: SingleInformationRowProps) => {
  return (
    <div
      className={cn("flex items-start col-span-12 md:col-span-6 sm:col-span-4", className)}
    >
      <h1 className="text-slate-600 capitalize">{innerText}</h1>
      {children}
    </div>
  );
};

export default SingleInformationRow;
