import React from 'react'

const SingleInformationRow = () => {
  return (
    <h1 className="relative uppercase font-medium text-sm p-2 border-l-2 border-black dark:border-slate-50">
    <Skeleton
      active
      paragraph={{ rows: 2 }}
      style={{ width: "100%" }}
      className="absolute"
    />
    <div className="absolute top-0 left-0 z-10 w-full">
      <Skeleton.Input
        active
        style={{ width: "50%" }}  // Set width of the third row
      />
    </div>
    <span className="relative z-20">PATIENT DATA</span>
  </h1>
  
  )
}

export default SingleInformationRow
