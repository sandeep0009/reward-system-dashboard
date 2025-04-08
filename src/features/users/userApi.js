import { axiosInstance } from "../../utils/axios"


const getAllUsers=async()=>{
    const res=await axiosInstance.get('/users');
    console.log(res);
}