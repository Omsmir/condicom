import { cn } from '@/lib/utils'
import { Spin } from 'antd'
import React from 'react'

interface SpinnerProps {
text?: string
className?:string
}
const Spinner:React.FC<SpinnerProps> = ({text,className}) => {
  return (
    <div className={cn("w-full h")}>
      
    </div>
  )
}

export default Spinner
