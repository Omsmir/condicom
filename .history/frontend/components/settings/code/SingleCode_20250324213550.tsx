import { code } from "@/types";
import { format } from "date-fns";
import React from "react";

const SingleCode = ({ code }: { code: code }) => {
    const data = {
        "assigned with":code.user || "not assigned",
        "code":code.code,
        "used":code.used ? "used" : "not used",
        "expiration date":format(code.expiration,"pp"),
        "role":
    }
  return (
    <div className="flex flex-col justify-start items-center col-span-6 sm:col-span-4 md:col-span-3 mr-2 last-of-type:mr-0 p-4  bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">

    </div>
  );
};

export default SingleCode;
