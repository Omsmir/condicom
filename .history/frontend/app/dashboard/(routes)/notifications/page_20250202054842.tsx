import { getNotifcations } from '@/actions/getNotifcations'
import Notification from '@/components/notificationsCenter/Notification'
import React, { Suspense } from 'react'
const page = async () => {

  return (
 <div className="h-screen py-14">
      <Notification />

 </div>
  )
}

export default page
