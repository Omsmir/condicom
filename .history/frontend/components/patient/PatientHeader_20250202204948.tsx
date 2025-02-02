import { patient } from '@/types'
import React from 'react'

const PatientHeader = ({patient}:{patient:patient | undefined}) => {
  return (
    <div className='flex flex-1 pt-14  m-4 '>
      <div className="flex bg-[var(--sidebar-background)]">
        hello
      </div>
    </div>
  )
}

export default PatientHeader
