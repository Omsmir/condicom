import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const PharmacyDynamic = dynamic(() => import("@/components/Pharmacy"))
const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
