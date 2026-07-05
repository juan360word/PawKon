import {create } from 'zustand'
import {persist} from 'zustand/middleware' // persiste el  guardado de las cosas 
import type { AuthUser } from '../Types/dataTypes'

type User = {
    id:string,
    name:string,
    mail:string
    role:'User' | 'Doctor'

}

type AuthStore = {
    user: AuthUser | null,
    token: string | null,
    setAuth: (user:User,token:string) => void,
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
        user:null,
        token:null,
        setAuth: (user,token) => set({user,token}), // set son acciones // hacemos esto para que se guarde la info y zustand lo actualice 
        logout: () => set({user:null,token:null}) // cuando se resete se pone null el login
    }),
    {name:'pawkon-auth'} // clave para el navegador 
    )
)

