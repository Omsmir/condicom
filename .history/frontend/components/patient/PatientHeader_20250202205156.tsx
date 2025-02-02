import { patient } from '@/types'
import React from 'react'
import CustomSkeleton from '../CustomSkeleton'

const PatientHeader = ({patient}:{patient:patient | undefined}) => {
  return (
    <div className='flex pt-14  m-2 '>
      <div className="flex justify-between items-center w-full bg-[var(--sidebar-background)] p-4 rounded-md">
        <CustomSkeleton src={patient?.profileImg?.url || "/frontend/public/assets/"} />
      </div>
    </div>
  )
}

export default PatientHeader
