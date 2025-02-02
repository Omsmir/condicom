"use client";
import { patient } from "@/types";
import { differenceInCalendarYears } from "date-fns";
import React from "react";
import SingleInformationRow from "./SingleInformationRow";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { PatientHook } from "../context/PatientProvider";

const PatientMedicalData = ({ patient }: { patient: patient | undefined }) => {
  
  const { loading } = PatientHook();
  const RowData = {
    "blood Type":patient?.bloodType,
    "weight":patient?.weight || "not assigned",
    "height":patient?.height || "not assigned",
    "past surgeries": patient?.pastSurgeries || "not assigned",
    "medical conditions":patient?.medicalConditions,
    "allergies":patient?.allergies,
    "family medical history":patient?.familyMedicalHistory || "not assigned",
    "alcohol":patient?.alcohol,
    "smoking":patient?.smoking,
    "current medications":patient?.currentMedications,
    "Alcohol frequency":patient?.alcoholFrequency || "not assigned",
    "smoking frequency":patient?.smokingFrequency || "not assigned"

  };
  return (
    <div className="flex flex-col py-2 items-start min-h-[225px]">
      <span className="flex border-black dark:border-slate-50 border-l-2 ">
        <h1 className="font-medium uppercase mx-3 text-sm ">Medical DATA</h1>
      </span>
      <div className="grid grid-cols-12 w-full">
        {Object.entries(RowData).map(([key, value], index) => (
          <SingleInformationRow innerText={key} key={index} className={`text-sm  mt-8`}>
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              loading={loading}
              innerText={value as string}
              classname="w-32 min-h-[30px] lowercase text-[13px]"
            />
          </SingleInformationRow>
        ))}
      </div>
    </div>
  );
};

export default PatientMedicalData;