"use client";
import { patient } from "@/types";
import { differenceInCalendarYears } from "date-fns";
import React from "react";
import SingleInformationRow from "./SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { PatientHook } from "../context/PatientProvider";

const PatientEmergencyData = ({ patient }: { patient: patient | undefined }) => {
  
  const { loading } = PatientHook();
  const RowData = {
    "emergency contact number":patient?.emergencyContactNumber,
    "emergency contact person": patient.em
  };
  return (
    <div className="flex flex-col py-2 pt-8 items-start min-h-[225px] mt-4 border-t">
      <span className="flex border-black dark:border-slate-50 border-l-2 ">
        <h1 className="font-medium uppercase mx-3 text-sm ">emergency DATA</h1>
      </span>
      <div className="grid grid-cols-12 w-full">
        {Object.entries(RowData).map(([key, value], index) => (
          <SingleInformationRow innerText={key} key={index} className={`text-sm  mt-8`}>
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              loading={loading}
              innerText={value as string}
              classname="w-32 min-h-[30px] text-[13px]"
            />
          </SingleInformationRow>
        ))}
      </div>
    </div>
  );
};

export default PatientEmergencyData;