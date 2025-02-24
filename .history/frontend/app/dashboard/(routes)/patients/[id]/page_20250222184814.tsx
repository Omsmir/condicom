import PatientLayout from '@/components/patient/PatientLayout'
import React from 'react'

const page = async ({params}:{params: Promise<{id:string}>}) => {
    const id = (await params).id

  return (
    <PatientLayout  id={id} />
  )
}

export default page
