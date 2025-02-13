import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const DoctorDynamic = dynamic(() => import("@/components/doctorProfile/DoctorLayout"));

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;

  return (
    <Suspense fallback={<Loading />}>
      <DoctorDynamic  id={id} />   
    </Suspense>
  );
};

export default page;
