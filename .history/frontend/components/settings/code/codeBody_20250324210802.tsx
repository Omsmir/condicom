"use client"

import Spinner from '@/components/Spinner'
import React from 'react'


type CodeBodyProps {
    
}
const codeBody = () => {
  return (
    <div className="grid grid-cols-12 w-full mt-4">
    {codes.isFetching ? (
      <Spinner size="small" className="absolute" />
    ) : codes.data ? (
      codes.data.pages.map((ele) => (
        <div className="flex flex-col">
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

export default codeBody
