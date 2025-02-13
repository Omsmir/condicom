"use client"
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  const {data:session} = useSession()

  if(session?.user.role !== "Admin")
  return (
      <DoctorTable />
  );
};

export default page;
