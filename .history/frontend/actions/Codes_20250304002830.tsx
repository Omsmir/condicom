import axios from "axios";

const baseURI = process.env.NEXT_API

console.log(base)
const axiosInstance =  axios.create({baseURL:`${baseURI}/code`})

interface CodeResponse {
    data:{
        message:string
    }
}


export const generateCode = async (formData:FormData,id:string | undefined): Promise<CodeResponse> => {
return await axiosInstance.post(`/${id}`,formData)
}




