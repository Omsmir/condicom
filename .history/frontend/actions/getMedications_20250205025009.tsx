import axios from "axios"

const baseUrl = process.env.NEXT_API

export const getAllMedications = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/medications`)

        const data = await response.data

        return data
    } catch (error:any) {
        console.log(error.message)
    }
}
