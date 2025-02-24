import React from 'react'
import AreaChart from './Charts'
import { getUser } from '@/actions/getUser'

const Overview = async({id}:{id:string | undefined}) => {
  const user = await getUser(id)
  return (
    <div >
     {user?._id}
    </div>
  )
}

export default Overview
