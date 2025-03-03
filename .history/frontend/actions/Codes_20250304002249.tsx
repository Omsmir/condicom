import axios from "axios";

const baseURI = process.env.NEXT_API
const axiosInstance =  axios.create({baseURL:`${baseURI}/code`})

interface CodeResponse {
    data:{
        
    }
}


export const generateCode = async (formData:FormData,id:string | undefined): Promise<T> => {
return await axiosInstance.post(`/${id}`,formData)
}




