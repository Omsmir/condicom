"use client"
import { useGetCodes, useGetUser } from '@/actions/queries'
import { useSession } from 'next-auth/react'
import React from 'react'

const CodeLayout = () => {
    const {data:session} = useSession()
    
    const {data} = useGetUser(session?.user.id)

    const codes = useGetCodes(session?.user.id)

  return (
    <div className='flex flex-col justify-center items-start col-span-12 mt-6'>
      
    </div>
  )
}

export default CodeLayout
