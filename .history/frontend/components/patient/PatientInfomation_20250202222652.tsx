"use client"
import { patient } from '@/types'
import React from 'react'
import PatientData from './PatientData'

const PatientInfomation = ({patient}:{patient:patient | undefined}) => {
  return (
    <section className='flex flex-col m-2 px-4 pt-4 rounded-md bg-[var(--sidebar-background)] '>
        <PatientData patient={patient} />
        <Pat
    </section>
  )
}

export default PatientInfomation
