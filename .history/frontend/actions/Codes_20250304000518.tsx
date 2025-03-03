import axios from "axios";

const baseURI = process.env.NEXT_API
const axiosInstance =  axios.create({baseURL:`${base}`})