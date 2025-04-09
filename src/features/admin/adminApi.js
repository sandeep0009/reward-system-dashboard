import { axiosInstance } from "../../utils/axios"


export const createRewards=async(data)=>{
    const res=await axiosInstance.post('/rewards',{data});
    return res.data;

}

export const getAllRewards=async()=>{
    const res=await axiosInstance.get('/rewards');
    return res.data;

}

export const getRewardsById=async(id)=>{
    const res=await axiosInstance.get(`/rewards/${id}`);
    return res.data;


}

export const updateRewards=async(id,data)=>{
    const res=await axiosInstance.put(`/rewards/${id}`,{data});
    return res.data;

}

export const deleteRewards=async(id)=>{
    const res=await axiosInstance.delete(`/rewards/:${id}`);
    return res.data;
}