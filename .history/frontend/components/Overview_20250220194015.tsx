"use client"
import React from 'react'
import AreaChart from './Charts'
import { useSession } from 'next-auth/react'
import { Key } from 'lucide-react'

const Overview = () => {
 const {data:session} = useSession()
  return (
    <div>
    {Object.entries(session).map(([Key,value]))}
    </div>
  )
}

export default Overview
