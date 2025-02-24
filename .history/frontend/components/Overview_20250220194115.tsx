"use client"
import React from 'react'
import AreaChart from './Charts'
import { useSession } from 'next-auth/react'
import { Key } from 'lucide-react'

const Overview = () => {
 const {data:session} = useSession()
 if(session)
  return (
    <div>
    {Object.entries()?.map(([Key,value]) => (
      <p></p>
    ))}
    </div>
  )
}

export default Overview
