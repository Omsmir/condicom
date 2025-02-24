"use client"
import React from 'react'
import AreaChart from './Charts'
import { useSession } from 'next-auth/react'
import { Key } from 'lucide-react'

const Overview = () => {
 const {data:session} = useSession()
 if(session)
  return (
    <div className='flex h-screen my-auto justify-center item'>
   {session.expires}
    </div>
  )
}

export default Overview
