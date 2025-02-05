import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const PharmacyDynamic = dynamic(() => import("@/components/pa"))
const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
