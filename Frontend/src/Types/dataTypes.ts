
import * as v from 'valibot'

export const RegisterSchema = v.object({
    name:v.pipe(v.string(),v.minLength(2,'Name must be at least 2 characters'),v.maxLength(50,'Name is too long')),
    mail:v.pipe(v.string(),v.email()),
    password:v.pipe(v.string(),v.minLength(6,'Password must be at least 6 characters'))
})


export const LoginSchema = v.object({
    mail:v.pipe(v.string(),v.email()),
    password:v.pipe(v.string(),v.minLength(6,'Password must be at least 6 characters'))
})


export type RegisterUser = v.InferOutput<typeof RegisterSchema>
export type LoginUser =  v.InferOutput<typeof LoginSchema>


// respuesta del backend al hacer login/register
export interface AuthResponse {
  id: string;
  name: string;
  mail: string;
  role: "User" | "Doctor";
  token: string;
}

// usuario guardado en Zustand
export interface AuthUser {
  id: string;
  name: string;
  mail: string;
  role: "User" | "Doctor";
}


export const AppointmentSchema = v.object({
    namePet:v.pipe(v.string(),v.minLength(2,'Pet name must be at least 2 characters')),
    description:v.string(),
    date:v.pipe(v.string(),v.minLength(1,'Date is required'))
})

export type createAppointment = v.InferOutput<typeof AppointmentSchema>



// esto hace parte de las adopaciones

const statusAdoptions = v.picklist(['pending','approved','rejected'])

export const AdoptionSchema = v.object({
    _id:v.string(),
    breedName:v.string(),
    breedImageUrl:v.string(),
    message:v.string(),
    status:statusAdoptions


})

export type Adoption = v.InferOutput< typeof AdoptionSchema>
export type createAdoption = Pick<Adoption,'breedName' | 'breedImageUrl' | 'message' >
export type onlyId = Pick<Adoption, '_id'>
export type statusAdoptions = v.InferOutput<typeof statusAdoptions>

// esto es todo lo que nos trae la api externa de dogs
// esto se coloco en las peticiones para que axios sepa que le va a llegar 
export interface Breed {
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  origin?: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  image?: {
    url: string;
  };
}

export interface BreedImage {
  id: string;
  url: string;
  width: number;
  height: number;
}



