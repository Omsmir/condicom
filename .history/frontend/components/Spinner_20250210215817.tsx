import { cn } from '@/lib/utils'
import { Spin } from 'antd'
import React from 'react'

interface SpinnerProps {
text?: string
className:string
size
}
const Spinner:React.FC<SpinnerProps> = ({text,className}) => {
  return (
    <div className={cn("flex justify-center items-center w-full h-full ",className)}>
      <Spin size={} />
    </div>
  )
}

export default Spinner
