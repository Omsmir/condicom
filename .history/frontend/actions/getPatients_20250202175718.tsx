import axios, { isAxiosError } from "axios"

const baseUrl = process.env.NEXT_API

export const getAllPatients = async () => {
    try {
        const response = await axios.get(`${baseUrl}/patient`)

        const data = await response.data.patients

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

export const getSpecficPatient = async (id:string) => {
    try {
        
    } catch (error) {
        
    }
}