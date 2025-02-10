import React from 'react'
import dynamic from 'next/dynamic'

const DynamicCalenderView = dynamic(() => import("@/components/appointments/CalenderView"))
const Calender = () => {
  return (
    <DynamicCalenderView />
  )
}

export default Calender
