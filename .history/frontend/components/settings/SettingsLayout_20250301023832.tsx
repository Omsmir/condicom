"use client"
import { Nunito } from '@/fonts/fonts'
import React from 'react'

const SettingsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={`flex h-screen max-h-screen justify-start items-start px-4 ${Nunito.className}`}>
        <div className="flexx"></div>
      {children}
    </div>
  )
}

export default SettingsLayout
