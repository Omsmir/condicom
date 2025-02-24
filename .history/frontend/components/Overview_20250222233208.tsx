"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { Key } from 'lucide-react'

const Overview = () => {
 const {data:session} = useSession()
 if(session)
  return (
    <div className='flex h-screen my-auto justify-center items-center'>
   {session.user.role}
    </div>
  )
}

export default Overview
