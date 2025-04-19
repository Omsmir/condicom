import { AccountProvider } from '@/components/context/AccountProvider'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <AccountProvider>
        {children}
    </AccountProvider>
  )
}

export default layout
