import { axiosInstance } from "../../utils/axios";


export const getActivitiesByUser = (userId) => {
    const allActivities = JSON.parse(localStorage.getItem("activities")) || [];
    return allActivities.filter((activity) => activity.userId === userId);
};
  


export const getAllActivites=async()=>{
    const res=await axiosInstance.get('/activity');
    return res.data;
}