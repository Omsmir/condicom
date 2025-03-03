import axios from "axios";

const baseUrl = process.env.NEXT_Api
const axiosInstance =  axios.create({baseURL:"http"})