"use client"
import React, { createContext } from 'react'


interface AccountContextProps {

}


const AccountContext = createContext<AccountContextProps | null>(null)

const AccountProvider = ({children}:{children:React.ReactNode}) => {
    const 
  return (
  <AccountContext.Provider value={}>
{children}
  </AccountContext.Provider>
  )
}

export default AccountProvider
