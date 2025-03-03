"use client"
import { UserInformation } from '@/types'
import React from 'react'
import AccountReusebleHeader from '../AccountHeader'
import { Divider } from 'antd'

const Department = ({user,isFetching}:{user:UserInformation | undefined,isFetching:boolean}) => {
  return (
    <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800">
      <AccountReusebleHeader showMenu innerText="Department && Role" />
      <Divider className=" dark:bg-slate-500 m-0 w-full" />

      
    </div>
  )
}

export default Department
