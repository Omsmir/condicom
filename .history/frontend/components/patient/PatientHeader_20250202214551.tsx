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
import AnchorElments from "./AnchorElements";
const PatientHeader = ({ patient }: { patient: patient | undefined }) => {
  const { loading, setLoading } = PatientHook();
  return (
    <div className="flex pt-14  m-2 ">
      <div className="flex flex-col  w-full bg-[var(--sidebar-background)] px-4 pt-4 rounded-md">
        <div className="flex  justify-between ">
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
              src={
                patient?.profileImg?.url || "/assets/images/female-doctor.jpg"
              }
            />
            <div className="flex flex-col items-start justify-start ml-2">
              <CustomSkeleton
                SkeletonType={SkeletonType.HEAD}
                loading={loading}
                classname="w-32 font-medium capitalize"
                innerText={`${patient?.firstName} ${patient?.lastName}`}
              />
              <CustomSkeleton
                SkeletonType={SkeletonType.HEAD}
                loading={loading}
                classname="w-28 cap text-slate-600"
                innerText={`${patient?.country}`}
              />
            </div>
          </div>
          <div className="h-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-slate-100 dark:bg-[var(--sidebar-accent)] p-0 border-0"
              >
                <DeleteHandler
                  id={patient?._id}
                  apiString="patient"
                  messagePopup="do you want to delete the patient"
                  className="absolute text-slate-50 right-0 hidden hover:text-red-800 transition-colors delete"
                  name="delete"
                  patientState
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex mt-4">
          <AnchorElments />
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
