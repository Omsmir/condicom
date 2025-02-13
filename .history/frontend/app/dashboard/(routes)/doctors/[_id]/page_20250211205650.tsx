import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const DoctorDynamic = dynamic(() => import("@/components/doctorProfile/DoctorLayout"));

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;

  return (
      <DoctorDynamic  id={id} />   
  );
};

export default page;
