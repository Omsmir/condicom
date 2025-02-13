import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";

const PatientsDynamic = dynamic(() => import("@/components/Patients"));
const pages = async () => {
  return (
      <PatientsDynamic />
  );
};

export default pages;
