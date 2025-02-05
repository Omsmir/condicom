import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const PharmacyDynamic = dynamic(() => import("@/components/Pharmacy"))
const page = () => {
  return (
    <Suspense fallback={}>
      
    </Suspense>
  )
}

export default page
