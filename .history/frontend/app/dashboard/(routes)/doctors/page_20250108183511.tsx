import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page = async () => {
  return (
    <Suspense fallback={<Loading/>}>
      <DoctorTable />
    </Suspense>
  );
};

export default page;
