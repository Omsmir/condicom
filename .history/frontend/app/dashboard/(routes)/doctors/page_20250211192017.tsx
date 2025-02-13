"use client"
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  const {data:session} = usession
  return (
      <DoctorTable />
  );
};

export default page;
