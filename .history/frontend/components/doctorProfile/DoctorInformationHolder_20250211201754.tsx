"use client"
import React from 'react'
import CustomSkeleton, { SkeletonType } from '../CustomSkeleton'

const DoctorInformationHolder = () => {
  return (
    <section className="flex flex-col bg-[var(--sidebar-background)] rounded-md p-4  lg:flex-row">
    <div className="flex justify-center items-center md:justify-start">
      <CustomSkeleton
            SkeletonType={SkeletonType.AVATAR}
            classname="overflow-hidden size-28"
            width={112}
            height={112}
            shape="square"
            size={112}
            loading={loading}
            setLoading={setLoading}
            src={
              user?.profileImg?.url || "/assets/images/female-doctor.jpg"
            }
          />
    </div>
    <div className="flex flex-col flex-1 justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center">
          <CustomSkeleton
              SkeletonType={SkeletonType.HEAD}
              loading={loading}
              classname="sm:min-w-36 min-h-[25px] font-medium capitalize pl-4 mr-4"
              innerText={user?.name}
            />
           
            <p className="text-sm font-medium mx-2 text-slate-500">{`(${user?.role})`}</p>
            <a
              href={`mailto:${user?.email}`}
              target="blank"
              className="flex justify-center items-center bg-slate-300 dark:bg-slate-700 p-[6px] rounded-full"
            >
              <MailFilled className="text-white" />
            </a>
            <a
              href={`tel:${user?.phone}`}
              target="blank"
              className="flex justify-center items-center bg-slate-300 dark:bg-slate-700 p-[6px] rounded-full ml-2"
            >
              <PhoneFilled className="text-white" />
            </a>
            {session?.user.id === user?._id &&
            <p className="text-sm font-medium mx-2 text-slate-500 capitalize hidden sm:block">Hello, Dr.{session?.user.name}</p>}
          </div>
          <VerifiyJsx />
        </div>
        <div className="flex flex-col px-4 my-2 sm:flex-row justify-start items-start">
          <div className="flex items-center justify-center">
            <Person sx={{ fontSize: 20 }} />
            <p className="text-slate-500 text-[12px] mx-1 font-medium capitalize">
              {user?.gender}
            </p>
          </div>
          <div className="flex items-center justify-center my-2 sm:mx-2 sm:my-0 ">
            <Place sx={{ fontSize: 20 }} />

            <p className="text-slate-500 text-[12px] mx-1 font-medium capitalize">
              {user?.address ? user.address : "not assigned"}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Work sx={{ fontSize: 20 }} />
            <p className="text-slate-500 text-[12px] mx-1 font-medium capitalize">
              {user?.occupation}
            </p>
          </div>
          <div className="flex items-center justify-center my-2 sm:mx-2 sm:my-0">
            <CalendarMonth sx={{ fontSize: 20 }} />
            <p className="text-slate-500 text-[12px] mx-1 font-medium capitalize">
              {format(user?.birthDate as Date, "PP")}{" "}
              {`(${birthDateYears} years old)`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-4">
        <div className="flex border-dotted p-2 border-2 border-slate-400 rounded-md">
          <h1 className={`font-medium text-[18px] flex`}>{user?.weight}</h1>
        </div>
        <div className="flex border-dotted p-2 border-2 border-slate-400 rounded-md mx-2">
          <h1 className={`font-medium text-[18px] flex`}>{user?.height}</h1>
        </div>
      </div>
    </div>
  </section>
  )
}

export default DoctorInformationHolder
