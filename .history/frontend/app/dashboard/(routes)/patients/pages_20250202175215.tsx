import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const PatientsDynamic = dynamic(() => import("@/components/Patients"))
const pages = async () => {
  return (
    <Suspense fallback={<Loadin}>

    </Suspense>
  )
}

export default pages
