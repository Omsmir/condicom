import axios from "axios";

const baseUrl = process.env.NEXT_API
const axiosInstance =  axios.create({baseURL:``})