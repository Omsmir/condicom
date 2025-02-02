import { patient } from '@/types'
import React from 'react'

const PatientHeader = ({patient}:{patient:patient | undefined}) => {
  return (
    <div className='flex flex-1 m-2 pt-4 bg-[var(--sidebar-background)]'>
      {patient?._id}
    </div>
  )
}

export default PatientHeader
