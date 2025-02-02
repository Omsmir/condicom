"use client"
import { patient } from '@/types'
import React from 'react'
import { PatientHook } from '../context/PatientProvider'

const PatientLayout = ({patient}:{patient:patient | undefined}) => {
    const {activeLink} = PatientHook()

    switch(activeLink){
        case
        default: return
    }
}

export default PatientLayout
