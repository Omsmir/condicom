"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SingleInformationRowProps {
  children: React.ReactNode;
  className?:string
}
const SingleInformationRow = () => {
  return (
    <h1 className={cn}></h1>
  );
};

export default SingleInformationRow;
