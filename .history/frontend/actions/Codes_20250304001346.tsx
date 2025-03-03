import axios from "axios";

const baseURI = process.env.NEXT_API
const axiosInstance =  axios.create({baseURL:`${baseURI}/code`})




export const generateCode = async (formData:FormData,id:string | undefined) => {
return await axiosInstance.post(`/${id}`,formData)
}




