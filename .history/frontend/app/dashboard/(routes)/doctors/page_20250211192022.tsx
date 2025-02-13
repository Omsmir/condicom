"use client"
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  const {data:session} = useSession()
  return (
      <DoctorTable />
  );
};

export default page;
