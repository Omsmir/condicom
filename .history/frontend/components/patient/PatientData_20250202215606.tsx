"use client"
import { patient } from '@/types'
import React from 'react'

const PatientData = ({patient}:{patient:patient | undefined}) => {
  return (
    <div className='flex flex-col p-4 items-start'>
        <span className="flex border-black border-2 border-l">
            <h1 className='font-medium uppercase'>PATIENT DATA</h1>
        </span>
    </div>
  )
}

export default PatientData
