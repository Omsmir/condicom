"use server"
import axios from "axios";

const baseURL = process.env.NEXT_API
const axiosInstace = axios.create({baseURL:`${baseURL}/`})
export const getNotification