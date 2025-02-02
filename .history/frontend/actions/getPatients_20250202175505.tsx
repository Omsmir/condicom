import axios from "axios"

const baseUrl = process.env.NEXT_API

export const getAllPatients = async () => {
    try {
        const response = await axios.get(`${baseUrl}/patient`)

        const data = await response.data.patients
    } catch (error) {
        if(is){

        }
    }
}