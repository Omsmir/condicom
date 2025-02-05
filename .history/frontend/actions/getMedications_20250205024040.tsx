import axios from "axios"

const baseUrl = process.env.NEXT_API

export const getAllMedications = async () => {
    try {
        const response = await axios.get(`${baseUrl}/medications/`)

        const data = await response.data

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
              throw new Error(error.response.data.message)
            } 
          } 
          }else {
            throw new Error("error")
          }
    }
}
