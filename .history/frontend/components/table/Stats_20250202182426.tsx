"use client"
import React from 'react'

interface StatsProps {
    StatsSection:string | undefined
    StatsIcon:React.ReactNode
    data:any
}

const Stats = ({StatsSection,StatsIcon,data}:StatsProps) => {
  return (
    <div className='flex items-center p-2'>
        <span className='flex justify-center items-center bg-slate-100 size-10 rounded-md mr-2'>
        {StatsIcon}
        </span>
      <p className='font-medium mr-1'>{data.length}</p>
      <h1 className='text-slate-600 font-medium'>{StatsSection}</h1>
    </div>
  )
}

export default Stats
