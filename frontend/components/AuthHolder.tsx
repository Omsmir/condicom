"use client"
import { SessionProvider } from "next-auth/react";
interface AuthCheckProps {
    children: React.ReactNode;
  }
  
  const AuthHolder: React.FC<AuthCheckProps> = ({ children }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthHolder
