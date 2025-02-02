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
      className={cn("flex flex-col items-start col-span-12 sm:col-span-6 md:col-span-4 ", className)}
    >
      <h1 className="text-slate-600 capitalize mb-2 fon">{innerText}</h1>
      {children}
    </div>
  );
};

export default SingleInformationRow;
