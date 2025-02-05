import { patient } from "@/types"
import axios, { isAxiosError } from "axios"

const baseUrl = process.env.NEXT_API

export const getAllPatients = async () => {
  console.log(baseUrl)
    try {
        const response = await axios.get(`${baseUrl}/patient/`)

        const data = await response.data

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
              throw new Error(error.response.data.message)
            } 
          } else if (error instanceof Error) {
            throw new Error(error.message)

          }
    }
}
