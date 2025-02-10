"use client"
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { DashboardHook } from "@/components/context/Dashboardprovider";

const PharmacyDynamic = dynamic(() => import("@/components/Pharmacy"))
const page = () => {
  const {api,contextHolder} = DashboardHook()
  return (
    <Suspense fallback={<Loading />}>
      {contextHolder}
      <PharmacyDynamic />
    </Suspense>
  )
}

export default page
