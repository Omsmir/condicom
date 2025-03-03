"use client"
import React from 'react'

const AccountInfo = ({}) => {

    const userData = {
        "Account Name": { value: user?.name, title: "name" },
        "Account Number": {value:`#${user?._id?.slice(0, 11).toUpperCase()}`},
        "Date Created":
          {value:user?.createdAt &&
          format(user?.createdAt as Date, "PPpp")},
        "Last Modified":{value:
          user?.updatedAt &&
          format(user?.updatedAt as Date, "PPpp")},
        Email: {value:user?.email},
        Role: {value:user?.role},
        occupation:{value:user?.occupation},
      };
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
