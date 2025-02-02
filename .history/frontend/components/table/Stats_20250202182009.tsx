"use client"
import React from 'react'

interface StatsProps {
    StatsSection:string
    StatsIcon:React.ReactNode
    data:any
}

const Stats = ({StatsSection,StatsIcon,data}:StatsProps) => {
  return (
    <div className='flex items-center'>
      <h1 className='text-slate-600 font-medium'></h1>
    </div>
  )
}

export default Stats
