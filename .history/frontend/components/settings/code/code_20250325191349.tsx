"use client"
import React from 'react'
import CodeGeneration from './codeGeneration'
import CodeLayout from './codeLayout'
import { DashboardHook } from '@/components/context/Dashboardprovider'

const code = () => {
  const {contextHolder} = DashboardHook()
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      {contextHolder}
      <CodeGeneration />
      <CodeLayout />
    </div>
  )
}

export default code
