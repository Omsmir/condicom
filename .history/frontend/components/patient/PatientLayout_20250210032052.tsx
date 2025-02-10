"use client";
import { patient } from "@/types";
import React from "react";
import { PatientHook } from "../context/PatientProvider";
import PatientInfomation from "./PatientInfomation";
import { MotionComponent } from "../relatedComponents/Motion";

const PatientLayout = ({ id}: { id:string | undefined}) => {
  const { activeLink } = PatientHook();
  const { data } = useSpecificPatient(id);

  const patient = data?.patient;
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
