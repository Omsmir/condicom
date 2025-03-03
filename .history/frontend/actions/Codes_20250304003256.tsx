import axios from "axios";

const baseURI = process.env.NEXT_API

console.log(baseURI)
const axiosInstance =  axios.create({baseURL:`http://localhost:8080/api/code`})

interface CodeResponse {
    data:{
        message:string
    }
}


export const generateCode = async (formData:FormData,id:string | undefined): Promise<CodeResponse> => {
    await new P
return await axiosInstance.post(`/${id}`,formData)
}




