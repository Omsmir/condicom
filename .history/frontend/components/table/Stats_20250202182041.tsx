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
        <span className='size-10 rounded-md'>
        {StatsIcon}
        </span>
      <h1 className='text-slate-600 font-medium'>{StatsSection}</h1>
    </div>
  )
}

export default Stats
