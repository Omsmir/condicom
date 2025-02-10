"use client";
import { patient } from "@/types";
import React from "react";
import { PatientHook } from "../context/PatientProvider";
import PatientInfomation from "./PatientInfomation";
import { MotionComponent } from "../relatedComponents/Motion";
import { useSpecificPatient } from "@/actions/queries";

const PatientLayout = ({ id}: { id:string | undefined}) => {
  const { activeLink } = PatientHook();
  const { data ,isError,error} = useSpecificPatient(id);

  const patient = data?.patient;

  if(isError) {
    return (
      <div className="flex h-screen justify-center items-center">
        <h1 className="font-medium text-lg">{error.message}{data.}</h1>
      </div>
    )
  }
  if(data)
  switch (activeLink) {
    case "#Patient Information":
      return (
        <MotionComponent>
          <PatientInfomation patient={patient} />
        </MotionComponent>
      );
    default:
      return null;
  }
};

export default PatientLayout;
