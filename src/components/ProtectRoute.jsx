import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoutes=({children})=>{
    const user=localStorage.getItem('user');
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user.isAdmin || user.isAdmin===undefined){
            navigate('/signin');
        }
    },[]);
    return <>{children}</>
   
}

export default ProtectRoutes