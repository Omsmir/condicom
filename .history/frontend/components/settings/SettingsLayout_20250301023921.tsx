"use client"
import { Nunito } from '@/fonts/fonts'
import React from 'react'

const SettingsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={`flex flex-col h-screen max-h-screen px-4 space-y-8 ${Nunito.className}`}>
        <div className="flex justify-start items-center px-2"></div>
      {children}
    </div>
  )
}

export default SettingsLayout
