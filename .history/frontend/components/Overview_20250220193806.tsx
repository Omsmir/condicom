import React from 'react'
import AreaChart from './Charts'
import { getSession } from 'next-auth/react'

const Overview = async() => {
  const {s} =await  getSession()
  return (
    <div>
    
    </div>
  )
}

export default Overview
