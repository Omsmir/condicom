"use client"
import React from 'react'

const SettingsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={`flex h-screen max-h-screen justify-start items-start px-4 ${nun}`}>
      {children}
    </div>
  )
}

export default SettingsLayout
