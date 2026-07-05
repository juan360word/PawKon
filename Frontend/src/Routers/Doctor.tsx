
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";




const Doctor = () => {
   

    const user = useAuthStore((item) => item.user)
    
    if(!user) {
        return <Navigate to={'/login'} replace/>
    }
    if(user.role !== 'Doctor'){
        return <Navigate to={'/'} replace/>
    }
    
    return <Outlet/>
}

export default Doctor


