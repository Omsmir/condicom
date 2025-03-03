"use client"
import { Nunito } from '@/fonts/fonts'
import React from 'react'
import NavigationMenu from './NavigationMenu'

const SettingsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={`flex flex-col h-screen max-h-screen px-4 pt-16 space-y-8 ${Nunito.className}`}>
        <div className="flex flex-col justify-center items-start p-6 w-full">
            <h1 className='font-bold text-2xl capitalize mb-6 '>Account Settings</h1>
            <div className="flex justify-start items-start px-4 border-b-2 w-full">
                <NavigationMenu />
            </div>
        </div>
      {children}
    </div>
  )
}

export default SettingsLayout
