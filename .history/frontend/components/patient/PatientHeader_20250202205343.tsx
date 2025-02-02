import { patient } from '@/types'
import React from 'react'
import CustomSkeleton from '../CustomSkeleton'
import { PatientHook } from '../context/PatientProvider'

const PatientHeader = ({patient}:{patient:patient | undefined}) => {
    const {loading,setLoading} = PatientHook()
  return (
    <div className='flex pt-14  m-2 '>
      <div className="flex justify-between items-center w-full bg-[var(--sidebar-background)] p-4 rounded-md">
        <CustomSkeleton loading src={patient?.profileImg?.url || "/assets/images/female-doctor.jpg"} />
      </div>
    </div>
  )
}

export default PatientHeader
