"use client";

import React from "react";

interface SingleInformationRowProps {
  children: React.ReactNode;
}
const SingleInformationRow = () => {
  return (
    <h1 className="relative uppercase font-medium text-sm p-2 border-l-2 border-black dark:border-slate-50"></h1>
  );
};

export default SingleInformationRow;
