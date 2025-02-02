"use client";
import { patient } from "@/types";
import React from "react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { PatientHook } from "../context/PatientProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { DeleteHandler } from "../togglers/Handlers";
import { MoreHorizontal } from "lucide-react";
const PatientHeader = ({ patient }: { patient: patient | undefined }) => {
  const { loading, setLoading } = PatientHook();
  return (
    <div className="flex pt-14  m-2 ">
      <div className="flex justify-between items-center w-full bg-[var(--sidebar-background)] p-4 rounded-md">
        <div className="flex items-center h-full">
          <CustomSkeleton
            SkeletonType={SkeletonType.AVATAR}
            classname="rounded-full overflow-hidden size-28"
            width={112}
            height={112}
            shape="circle"
            size={112}
            loading={loading}
            setLoading={setLoading}
            src={patient?.profileImg?.url || "/assets/images/female-doctor.jpg"}
          />
          <div className="flex flex-col items-start justify-start ml-2">
            <h1 className="font-medium capitalize ">
              {patient?.firstName} {patient?.lastName}
            </h1>
            <p className="text-slate-600">{patient?.country}</p>
          </div>
        </div>
     <div className="flex">
      
     </div>
      </div>
    </div>
  );
};

export default PatientHeader;
