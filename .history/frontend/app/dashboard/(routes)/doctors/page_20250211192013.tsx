"use client"
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  const {data:sess}
  return (
      <DoctorTable />
  );
};

export default page;
