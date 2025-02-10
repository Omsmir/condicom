import { getSpecficPatient } from '@/actions/Patients'
import PatientLayout from '@/components/patient/PatientLayout'
import React from 'react'

const page = async ({params}:{params: Promise<{_id:string}>}) => {
    const id = (await params)._id

    const patient = await getSpecficPatient(id)
  return (
    <PatientLayout patient={patient} />
  )
}

export default page
