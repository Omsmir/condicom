"use client"
import Forbidden from "@/app/forbidden";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { forbidden } from "next/navigation";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  const {data:session} = useSession()

  if(session?.user.role !== "Admin") return <Forbidden />
  return (
      <DoctorTable />
  );
};

export default page;
