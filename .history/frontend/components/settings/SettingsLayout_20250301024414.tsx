"use client"
import { Nunito } from '@/fonts/fonts'
import React from 'react'

const SettingsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={`flex flex-col h-screen max-h-screen px-4 pt-16 space-y-8 ${Nunito.className}`}>
        <div className="flex flex-col justify-center items-start p-6">
            <h1 className='font-bold text-2xl capitalize mb-4'>Account Settings</h1>
            <div className="flex justify-center items-center px-4 border-b">

            </div>
        </div>
      {children}
    </div>
  )
}

export default SettingsLayout
