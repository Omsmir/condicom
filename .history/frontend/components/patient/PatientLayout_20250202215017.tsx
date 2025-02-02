"use client"
import { patient } from '@/types'
import React from 'react'
import { PatientHook } from '../context/PatientProvider'
import PatientInfomation from './PatientInfomation'

const PatientLayout = ({patient}:{patient:patient | undefined}) => {
    const {activeLink} = PatientHook()

    switch(activeLink){
        case "#Patient Information":
        return <PatientInfomation patient={patient} />
        default: return null
    }
}

export default PatientLayout
