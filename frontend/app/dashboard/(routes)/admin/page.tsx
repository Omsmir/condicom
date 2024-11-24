"use client"
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const page = () => {
    const {data: session,status} = useSession()
    const router = useRouter()
 
    useEffect(() => {
     
        if(status === "loading")return
        if(!session || session.user.role !== "admin"){
            router.push("/")
        }
    },[status,session])
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p >welcome to the admin page</p>
      you are an {session?.user.role}
    </div>
  )
}

export default page
