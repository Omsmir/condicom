"use client"
import { patient } from '@/types'
import React from 'react'
import PatientData from './PatientData'
import PatientMedicalData from './PatientMedicalData'
import PatientEmergencyData from './PatientEmergencyData'

const PatientInfomation = ({patient}:{patient:patient | undefined}) => {
  return (
    <section className={`flex flex-col relative m-2 px-4 pt-4 rounded-md bg-[var(--sidebar-background)] z-10 printable'`}>
        <PatientData patient={patient} />
        <PatientMedicalData patient={patient} />
        <PatientEmergencyData patient={patient} />
    </section>
  )
}

export default PatientInfomation
