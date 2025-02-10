"use client";
import { patient } from "@/types";
import { Divider } from "@mui/material";
import { Image, Skeleton } from "antd";
import { Eye } from "lucide-react";


const Patients = ({ patient }: { patient: patient[] | undefined }) => {
  return (
    <div className="flex flex-1 flex-col bg-[var(--sidebar-background)] rounded-md sm:min-w-[386px] max-h-[235px] overflow-hidden my-4">
      <div className="flex p-4 items-center">
        <h1 className="dark:text-slate-500 font-medium">Patients</h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0" />
        <div className="flex flex-col max-h-[175px] overflow-y-scroll">
       {patient && patient.length > 0 ? pa}
       
        </div>
    </div>
  );
};

export default Patients;
