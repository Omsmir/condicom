"use client"

import { codeInterface } from '@/actions/Codes'
import Spinner from '@/components/Spinner'
import { code, UserInformation } from '@/types'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import React from 'react'


type CodeBodyProps ={
    codes:  UseInfiniteQueryResult<InfiniteData<codeInterface, unknown>, Error>
    user:UserInformation | undefined
}
const CodeBody = ({codes,user}:CodeBodyProps) => {
  return (
    <div className="grid grid-cols-12 w-full mt-4 min-h-[325px]">
    {codes.isFetching ? (
      <Spinner size="small" className="relative" />
    ) : codes.data ? (
      codes.data.pages.map((ele) => (
          ele.codes.map((element) => (
            <div className="flex flex-col col-span-6 sm:col-span-4 md:col-span-3">
              <p>{element.code}</p>
            </div>
          ))
      ))
    ) : codes.isError ? (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-slate-600 text-sm font-medium capitalize">
          {codes.error.message}
        </p>
      </div>
    ) : (
      "no data"
    )}
  </div>
  )
}

export default CodeBody
