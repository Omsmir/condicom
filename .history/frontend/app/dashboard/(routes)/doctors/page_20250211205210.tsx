"use client"
import Forbidden from "@/app/forbidden";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { forbidden } from "next/navigation";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {

  return (
      <DoctorTable />
  );
};

export default page;
