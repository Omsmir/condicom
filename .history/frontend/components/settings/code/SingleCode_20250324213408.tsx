import { code } from "@/types";
import React from "react";

const SingleCode = ({ code }: { code: code }) => {
    const data = {
        "assigned with":code.user ||
    }
  return (
    <div className="flex flex-col justify-start items-center col-span-6 sm:col-span-4 md:col-span-3 mr-2 last-of-type:mr-0 p-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">

    </div>
  );
};

export default SingleCode;
