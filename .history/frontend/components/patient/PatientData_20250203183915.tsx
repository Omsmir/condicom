"use client";
import { patient } from "@/types";
import { differenceInCalendarYears } from "date-fns";
import React from "react";
import SingleInformationRow from "./SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { PatientHook } from "../context/PatientProvider";
import { lato } from "@/fonts/fonts";

const PatientData = ({ patient }: { patient: patient | undefined }) => {
  const patientAge = differenceInCalendarYears(
    new Date(),
    patient?.birthDate as Date
  );
  const { loading } = PatientHook();
  const RowData = {
    Age: `${patientAge} years old`,
    gender: patient?.gender,
    "email address": patient?.email || "not assigned",
    "mobile number": patient?.phone,
    address: patient?.residentialAddress || "not assigned",
    "insurance provider": patient?.insuranceProvider || "not assigned",
  };
  return (
    <div className="flex flex-col py-2 items-start min-h-[225px]">
      <span className="flex border-black dark:border-slate-50 border-l-2">
        <h1 className={`font-medium uppercase mx-3 text-sm ${lato.className}`}>PATIENT DATA</h1>
      </span>
      <div className="grid grid-cols-12 w-full">
        {Object.entries(RowData).map(([key, value], index) => (
          <SingleInformationRow innerText={key} key={index} className={`text-sm  mt-8`}>
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              loading={loading}
              innerText={value}
              classname="w-32 min-h-[30px] text-[13px] "
            />
          </SingleInformationRow>
        ))}
      </div>
    </div>
  );
};

export default PatientData;
