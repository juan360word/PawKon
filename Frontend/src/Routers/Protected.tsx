import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";




const Protected = () => {
   


    const token = useAuthStore((item) => item.token)
    
    if(!token){
         return <Navigate to={'/login'} replace/>
    } 
    
    return <Outlet/>
}


export default Protected




