import React from 'react'

const page = async ({params}:{params: Promise<{_id:string}>}) => {
    const id = (await params)._id

    
  return (
    <div>
      
    </div>
  )
}

export default page
