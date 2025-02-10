import { cn } from '@/lib/utils'
import { Spin } from 'antd'
import React from 'react'

interface SpinnerProps {
text?: string
className:string
size?: "small" | "large" | "medium"
}
const Spinner:React.FC<SpinnerProps> = ({text,className,size}) => {
  return (
    <div className={cn("flex justify-center items-center w-full h-full ",className)}>
      <Spin size={size ?? "large"} />
    </div>
  )
}

export default Spinner
