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
        <span className='flex justify-center items-center bg-slate-100 size-10 rounded-md mr-2'>
        {StatsIcon}
        </span>
      <p className='font-medium'></p>
      <h1 className='text-slate-600 font-medium'>{StatsSection}</h1>
    </div>
  )
}

export default Stats
