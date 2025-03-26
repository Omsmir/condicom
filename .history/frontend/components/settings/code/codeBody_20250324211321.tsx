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
    <div className="grid grid-cols-12 w-full mt-4 ">
    {codes.isFetching ? (
      <Spinner size="small" className="absolute" />
    ) : codes.data ? (
      codes.data.pages.map((ele) => (
        <div className="flex flex-col overflow-x-hidden">
          {ele.codes.map((element) => (
            <div className="flex">
              <p>{element.code}</p>
            </div>
          ))}
        </div>
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
