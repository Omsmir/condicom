"use client"
import React from 'react'
import AreaChart from './Charts'
import { useSession } from 'next-auth/react'

const Overview = () => {
 const {data:session} = useSession()
  return (
    <div>
    {Object.entries(session).map(())}
    </div>
  )
}

export default Overview
