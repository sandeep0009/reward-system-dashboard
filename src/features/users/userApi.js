import { axiosInstance } from "../../utils/axios"


export const getAllUsers=async()=>{
    const res=await axiosInstance.get('/users');
    return res.data;
}

export const getLeaderboard=async()=>{
    const res=await axiosInstance.get('/users');
    const topPointers = res.data
      .filter(user => typeof user.points === 'number') 
      .sort((a, b) => b.points - a.points)
      .slice(0, 10)
    return topPointers;
    
}

const getById=async(id)=>{

}