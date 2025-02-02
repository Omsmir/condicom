import { getSpecficPatient } from '@/actions/getPatients'
import React from 'react'

const page = async ({params}:{params: Promise<{_id:string}>}) => {
    const id = (await params)._id

    const patient = await getSpecficPatient(id)
  return (
    <Patien
  )
}

export default page
