import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const PharmacyDynamic = dynamic(() => import("@/components/Pharmacy"))
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Pharm
    </Suspense>
  )
}

export default page
