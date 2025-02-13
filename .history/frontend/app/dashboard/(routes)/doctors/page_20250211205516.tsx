import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  return (
    <Suspense fallback={<Loadi />}>
      <DoctorTable />
    </Suspense>
  );
};

export default page;
