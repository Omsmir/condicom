import React from 'react'
import AreaChart from './Charts'
import { getSession } from 'next-auth/react'

const Overview = () => {
  const {data:session} = getSession()
  return (
    <div>
    
    </div>
  )
}

export default Overview
