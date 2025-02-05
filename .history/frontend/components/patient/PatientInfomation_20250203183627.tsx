"use client"
import { patient } from '@/types'
import React from 'react'
import PatientData from './PatientData'
import PatientMedicalData from './PatientMedicalData'
import PatientEmergencyData from './PatientEmergencyData'

const PatientInfomation = ({patient}:{patient:patient | undefined}) => {
  return (
    <section className={``}>
        <PatientData patient={patient} />
        <PatientMedicalData patient={patient} />
        <PatientEmergencyData patient={patient} />
    </section>
  )
}

export default PatientInfomation
