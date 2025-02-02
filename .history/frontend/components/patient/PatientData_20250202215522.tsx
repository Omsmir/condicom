"use client"
import { patient } from '@/types'
import React from 'react'

const PatientData = ({patient}:{patient:patient | undefined}) => {
  return (
    <div className='flex flex-col p-4 items-start'>
        <span className="flex border-l border-black border-2">
            <h1>PATIENT DATA</h1>
        </span>
    </div>
  )
}

export default PatientData
