"use client";
import { patient } from "@/types";
import React from "react";
import { PatientHook } from "../context/PatientProvider";
import PatientInfomation from "./PatientInfomation";
import { MotionComponent } from "../relatedComponents/Motion";

const PatientLayout = ({ patient }: { patient: patient | undefined }) => {
  const { activeLink } = PatientHook();

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
