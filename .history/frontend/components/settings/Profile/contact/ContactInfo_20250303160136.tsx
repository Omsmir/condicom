"use client"
import CustomSkeleton, { SkeletonType } from '@/components/CustomSkeleton'
import SingleInformationRow from '@/components/patient/SingleInformationRow'
import { UserInformation } from '@/types'
import React, { Fragment } from 'react'

const ContactInfo = ({user,isFetching}:{user:UserInformation | undefined,isFetching:boolean}) => {


    const data = {
        "email address":user?.email,
        "contact number":user?.phone,
        "role":user?.role,
        "address":user?.address || "not assigned"
    }
  return <Fragment>
    {}
  </Fragment>
}

export default ContactInfo
