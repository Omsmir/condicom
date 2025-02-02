"use client"
import { patient } from '@/types'
import { differenceInCalendarYears } from 'date-fns'
import React from 'react'

const PatientData = ({patient}:{patient:patient | undefined}) => {
    const patientAge = differenceInCalendarYears(patie)
    const RowData ={
        "Age":patient
    }
  return (
    <div className='flex flex-col p-4 items-start'>
        <span className="flex border-black border-l-2">
            <h1 className='font-medium uppercase mx-3'>PATIENT DATA</h1>
        </span>
        <div className="grid grid-cols-12">

        </div>
    </div>
  )
}

export default PatientData
