"use client";
import { patient } from "@/types";
import React from "react";
import { PatientHook } from "../context/PatientProvider";
import PatientInfomation from "./PatientInfomation";
import { MotionComponent } from "../relatedComponents/Motion";
import { useSpecificPatient } from "@/actions/queries";
import Link from "next/link";

const PatientLayout = ({ id}: { id:string | undefined}) => {
  const { activeLink } = PatientHook();
  const { data ,isError,error} = useSpecificPatient(id);

  const patient = data?.patient;

  if(isError) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <Link href={"/dashboard/patients"}>
        Back to patients
        </Link>
        <h1 className="font-medium text-lg">{error.message}</h1>
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
