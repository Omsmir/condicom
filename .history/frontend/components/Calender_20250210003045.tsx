import React from 'react'
import dynamic from 'next/dynamic'

const DynamicCalenderView = dynamic(() => import("@/components/appointments/ca"))
const Calender = () => {
  return (
    <div>
      
    </div>
  )
}

export default Calender
