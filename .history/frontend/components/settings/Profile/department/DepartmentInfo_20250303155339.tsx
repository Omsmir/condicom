"use client"
import SingleInformationRow from '@/components/patient/SingleInformationRow'
import React from 'react'

const DepartmentInfo = () => {
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
  </SingleInformationRo>
  )
}

export default DepartmentInfo
