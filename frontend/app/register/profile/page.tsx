"use client"

import Profile from "@/components/register/Profile"
import { useSession } from "next-auth/react"

const page = () => {
  return (
    <main className='min-h-screen flex justify-center items-center py-4 px-4 sm:px-0'>
      <div className="sub-container max-w-[600px]">
      <Profile />

      </div>
    </main>
  )
}

export default page
