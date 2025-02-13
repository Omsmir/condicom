import { UserInformation } from "@/types"
import axios from "axios"

export const getUser = async (userId:string | undefined) => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/${userId}`)

        if(!response.ok){
            throw new Error("Failed To Get user Data")
        }

        const data = await response.json() 

        const user = await data.existingUser as UserInformation

        return user

    } catch (error: any) {
        console.log(error)
    }
 
}


export const getAllUsers = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/auth")

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()


        return data
    } catch (error) {
        console.error(error)
    }
}


const axiosInstace = axios.create({baseURL:"http://localhost:8080/api/auth/"})

type LoginApiProps = {
email:string | undefined;
password: string | un
}

export const LoginApi  = async () {
    return await axiosInstace.post("login",)
}