"use client"
import React, { createContext, useState } from 'react'


interface AccountContextProps {
    ProfileEdit: boolean;
    setProfileEdit: React.Dispatch<React.SetStateAction<boolean>>;
}


const AccountContext = createContext<AccountContextProps | null>(null)

const AccountProvider = ({children}:{children:React.ReactNode}) => {
    const [ProfileEdit,setProfileEdit] = useState<boolean>(false)
  return (
  <AccountContext.Provider value={}>
{children}
  </AccountContext.Provider>
  )
}

export default AccountProvider
