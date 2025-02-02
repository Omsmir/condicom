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
    <h1
      className={cn("relative uppercase font-medium text-sm p-2 bg-[var(--sidebar-background)]", className)}
    >
      {innerText}
      {children}
    </h1>
  );
};

export default SingleInformationRow;
