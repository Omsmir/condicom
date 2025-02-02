import React from 'react'
import dynamic from 'next/dynamic'

const PatientsDynamic = dynamic(() => import("@/components/p"))
const pages = async () => {
  return (
    <div>
      
    </div>
  )
}

export default pages
