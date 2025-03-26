"use client"
import { useGetCodes, useGetUser } from '@/actions/queries'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const CodeLayout = () => {
    const {data:session} = useSession()
    
    const user = useGetUser(session?.user.id)

    const codes = useGetCodes(session?.user.id)

    const [name,setName] = useState<string>("")
  return (
    <div className='flex flex-col justify-center items-start col-span-12 mt-6'>
      <div className="flex justify-between items-center p-4">
        <Input name={name} onChange={(e) => setName(e.target.value)} className='shad-input max-h-[35px]' placeholder='role' />
      </div>
    </div>
  )
}

export default CodeLayout
