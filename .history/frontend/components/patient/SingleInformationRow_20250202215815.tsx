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
      className={cn("grid ", className)}
    >
      {innerText}
      {children}
    </div>
  );
};

export default SingleInformationRow;
