import { patient } from '@/types'
import React from 'react'

const PatientHeader = ({patient}:{patient:patient | undefined}) => {
  return (
    <div className='flex pt-14  m-2 '>
      <div className="flex justify-between items-center w-full bg-[var(--sidebar-background)] p-4 rounded-md">
        hello
      </div>
    </div>
  )
}

export default PatientHeader
