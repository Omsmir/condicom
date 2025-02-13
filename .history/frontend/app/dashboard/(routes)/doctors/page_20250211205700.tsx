import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  return (
      <DoctorTable />
  );
};

export default page;
