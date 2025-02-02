import React from 'react'

const SingleInformationRow = () => {
  return (
<h1 className="relative uppercase font-medium text-sm p-2 border-l-2 border-black dark:border-slate-50" >
          <Skeleton
            active
            paragraph={{ rows: 2}}
            style={{width:"100%"}}
            className="absolute"
          />
          PATIENT DATA
        </h1>
  )
}

export default SingleInformationRow
