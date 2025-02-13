import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const PharmacyDynamic = dynamic(() => import("@/components/Pharmacy"))
const page = () => {

  return (
      <PharmacyDynamic />
  )
}

export default page
