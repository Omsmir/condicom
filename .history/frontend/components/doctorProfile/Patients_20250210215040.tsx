"use client";
import { patient } from "@/types";
import { Divider } from "@mui/material";
import { Image, Skeleton } from "antd";
import { Eye } from "lucide-react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { DashboardHook } from "../context/Dashboardprovider";
import { differenceInCalendarYears } from "date-fns";
import { UsePatientQuery } from "@/actions/queries";
import SinglePatient from "./SinglePatient";


const Patients = () => {

  return (
    <div className="flex flex-1 flex-col bg-[var(--sidebar-background)] rounded-md sm:min-w-[386px] max-h-[235px]  my-4">
      <div className="flex p-4 items-center">
        <h1 className="dark:text-slate-500 font-medium">Patients</h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0" />
        <div className="flex flex-col min-h-[175px] max-h-[175px] overflow-y-scroll">
       
        </div>
    </div>
  );
};

export default Patients;
