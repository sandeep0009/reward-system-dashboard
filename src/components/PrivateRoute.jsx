import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoutes=({children})=>{
    const isAdmin=localStorage.getItem('isAdmin');
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isAdmin || isAdmin===undefined){
            navigate('/login');
        }
    },[]);
    return <>{children}</>
   
}

export default ProtectRoutes