import { useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";
import { LoginUsers, RegisterUsers } from "../Api/AuthApi";


// Este es el hook mas importante por que es el que verifica

export const useLogin = () => {
    
    const navigate = useNavigate()
    const Auth = useAuthStore((item) => item.setAuth)

    return useMutation({
        mutationFn:LoginUsers,
        onSuccess: (data) => {
            Auth({
                id: data.id,
                name: data.name,
                mail: data.mail,
                role: data.role
                },
                data.token
            )

            if(data.role === 'Doctor'){
                return navigate('/doctor')
            }else{
                return navigate('/')
            }
        },
        onError:(error) => {
            console.log('Error  login',error)
        }
    })
}

export const useRegister = () => {
    
    const navigate = useNavigate()
    const Auth = useAuthStore((item) => item.setAuth)
    
    return useMutation({
        mutationFn:RegisterUsers,
        onSuccess:(data) => {
            Auth({
                id: data.id,
                name: data.name,
                mail:data.mail,
                role: data.role
            },
            data.token
        )
        navigate('/')
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

