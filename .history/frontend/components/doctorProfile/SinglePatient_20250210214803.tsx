"use client"
import { UsePatientQuery } from '@/actions/queries'
import React from 'react'
import { DashboardHook } from '../context/Dashboardprovider'

const SinglePatient = () => {
    const {data} = UsePatientQuery()

    const patients = data?.Patients
    const {loading} = DashboardHook()
      const patientAge =(patient:patient) => {
        return differenceInCalendarYears(
          new Date(),
          patient?.birthDate as Date
        );
      }
  return (
    {data && patients && patients.length > 0 ? patients.map((patient) => (
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
             SkeletonType={SkeletonType.HEAD}
             loading={loading}
             classname="w-40 min-h-[20px] text-sm font-medium capitalize"
             innerText={`${patient?.firstName} ${patient?.lastName}`}
           />
           <CustomSkeleton
             SkeletonType={SkeletonType.HEAD}
             loading={loading}
             classname="w-22 text-[12px] text-slate-500"
             innerText={`${patientAge(patient)} years old`}
           />
          </div>
        </div>
        <div className="flex flex-col justify-start h-full">
          <p className="text-red-800 text-[12px] capitalize">{patient.allergies}</p>
        </div>
      </div>
    )) : "no patients"}
  )
}

export default SinglePatient
