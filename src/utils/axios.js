import axios from "axios";



const BASE_URL=import.meta.env.VITE_BACKEND;
export const axiosInstance=axios.create({
    baseURL:BASE_URL
});