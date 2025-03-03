"use client"
import CustomSkeleton, { SkeletonType } from '@/components/CustomSkeleton'
import SingleInformationRow from '@/components/patient/SingleInformationRow'
import { UserInformation } from '@/types'
import React from 'react'

const ContactInfo = ({user,isFetching}:{user:UserInformation | undefined,isFetching:boolean}) => {


    const data = {
        "email address":user?.email,
        "contact number":user?.phone,
        ""
    }
  return (
    <SingleInformationRow
    innerText={element.title}
    key={element.title}
    className={`text-sm md:col-span-4 lg:col-span-3 mt-8`}
  >
    <CustomSkeleton
      SkeletonType={SkeletonType.HEAD}
      innerText={element.value}
      loading={isFetching}
      classname="min-w-32 text-sm"
    />
  </SingleInformationRow>
  )
}

export default ContactInfo
