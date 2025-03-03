"use client"
import { UserInformation } from '@/types'
import React from 'react'
import AccountReusebleHeader from '../AccountHeader'
import { Divider } from 'antd'
import RelatedInfo from './RelatedInfo'

const Related = ({user,isFetching}:{user:UserInformation | undefined,isFetching:boolean}) => {
  return (
    <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800 mt-6">
      <AccountReusebleHeader  innerText="Related Info" />
      <Divider className=" dark:bg-slate-500 m-0 w-full" />

<RelatedInfo user={user} isFetching={isFetching} />

    </div>
  )
}

export default Related
