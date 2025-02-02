import React from 'react'
import dynamic from 'next/dynamic'

const PatientsDynamic = dynamic(() => import("@/"))
const pages = async () => {
  return (
    <div>
      
    </div>
  )
}

export default pages
