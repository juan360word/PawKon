import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";
import { LoginUsers, RegisterUsers } from "../Api/AuthApi";
import type { AuthResponse } from "../Types/dataTypes";
import { sileo } from "sileo";

// Este es el hook mas importante por que es el que verifica

export const useLogin = () => {
    
    const navigate = useNavigate()
    const Auth = useAuthStore((item) => item.setAuth)

    return useMutation({
        mutationFn:LoginUsers,
        onSuccess: (data:AuthResponse) => {
            if(!data) return

            Auth({
                id: data.id,
                name: data.name,
                mail: data.mail,
                role: data.role
                },
                data.token
            )

            sileo.success({ title:'Login Successful', fill:"black", duration:2000 })

            if(data.role === 'Doctor'){
                return navigate('/doctor')
            }else{
                return navigate('/')
            }
        },
        onError:() => {
            sileo.error({ title:'Login Failed', description:'ERROR CREDENTIALS', styles:({description:'text-white!'}), fill:"black", duration:3000 })
        },
        throwOnError: false
    })
}

export const useRegister = () => {
    
    const Auth = useAuthStore((item) => item.setAuth)
    
    return useMutation({
        mutationFn:RegisterUsers,
        onSuccess:(data:AuthResponse) => {
            Auth({
                id: data.id,
                name: data.name,
                mail:data.mail,
                role: data.role
            },
            data.token
        )
        } ,
        onError: (error) => {
            console.log('error Register',error)
        }
    }) 
}


export const useLogout = () => {
    
    const navigate = useNavigate()
    const logout = useAuthStore((item) => item.logout)

    return () => {
        logout()
        navigate('/login')
    }
}

