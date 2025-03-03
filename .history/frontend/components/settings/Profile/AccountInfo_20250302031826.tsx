"use client"
import React from 'react'

const AccountInfo = () => {
  return (
    {Object.entries(userData).map(([key, value], index) => (
        <SingleInformationRow
          innerText={key}
          key={key}
          className={`text-sm md:col-span-4 lg:col-span-3 mt-10`}
        >
          {ProfileEdit && (key === "Account Name" || key === "occupation") ? (
            FieldEnumration({ key, value: value.value as string })
          ) : (
            <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              innerText={value.value}
              loading={isFetching}
              classname="min-w-32 text-sm"
            />
          )}
        </SingleInformationRow>
      ))}
  )
}

export default AccountInfo
