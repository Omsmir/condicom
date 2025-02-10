"use client";
import { patient } from "@/types";
import { Divider } from "@mui/material";
import { Image, Skeleton } from "antd";
import { Eye } from "lucide-react";
import CustomSkeleton from "../CustomSkeleton";


const Patients = ({ patients }: { patients: patient[] | undefined }) => {
  return (
    <div className="flex flex-1 flex-col bg-[var(--sidebar-background)] rounded-md sm:min-w-[386px] max-h-[235px] overflow-hidden my-4">
      <div className="flex p-4 items-center">
        <h1 className="dark:text-slate-500 font-medium">Patients</h1>
      </div>
      <Divider className=" dark:bg-slate-500 m-0" />
        <div className="flex flex-col max-h-[175px] overflow-y-scroll">
       {patients && patients.length > 0 ? patients.map((patient) => (
           <div key={patient._id} className="flex justify-between items-center p-4 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors">
           <div className="flex items-center">
             <span className="size-10 overflow-hidden rounded-full">
               <Image
                 width={40}
                 height={40}
                 src={patient?.profileImg?.url || "/assets/images/dr-cameron.png"}
                 placeholder={<Skeleton avatar />}
                 className="w-full h-full object-cover object-center "
                 preview={{
                   mask: <Eye size={14} />,
                 }}
               />
             </span>
             <div className="flex flex-col mx-2">
             <CustomSkeleton
              SkeletonType={SkeletonType.AVATAR}
              classname="rounded-full overflow-hidden size-28 "
              width={112}
              height={112}
              shape="circle"
              size={112}
              loading={loading}
              setLoading={setLoading}
              src={
                patient?.profileImg?.url || "/assets/images/female-doctor.jpg"
              }
            />
               <p className="text-[12px] text-slate-500">{1} Years Old</p>
             </div>
           </div>
           <div className="flex flex-col justify-start h-full">
             <p className="text-red-800 text-[12px] capitalize">{patient.allergies}</p>
           </div>
         </div>
       )) : "no patients"}
       
        </div>
    </div>
  );
};

export default Patients;
