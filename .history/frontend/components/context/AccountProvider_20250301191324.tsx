"use client"
import React, { createContext } from 'react'


interface AccountContextProps {

}


const AccountContext = createContext<AccountContextProps | null>(null)

const AccountProvider = ({children}:{children:React.ReactNode}) => {
  return (
  <AccountContext>
    
  </AccountContext>
  )
}

export default AccountProvider
