
import * as v from 'valibot'

export const authSchema = v.object({
    name:v.string(),
    mail:v.string(),
    password:v.string()
})

export type Auth = v.InferOutput<typeof authSchema>
export type RegisterUser = Pick<Auth, 'name' | 'mail' | 'password' >
export type LoginUser = Pick<Auth, 'name' | 'mail'  >


export const AppointmentSchema = v.object({
    namePet:v.string(),
    description:v.string(),
    date:v.string()
})

export type Appointment = v.InferOutput<typeof AppointmentSchema>
export type createAppointment = Pick<Appointment, 'namePet' | 'description' | 'date'>


// esto hace parte de las adopaciones

const statusAdoptions = v.picklist(['pending','approved','rejected'])

export const AdoptionSchema = v.object({
    id:v.string(),
    breedName:v.string(),
    breedImageUrl:v.string(),
    message:v.string(),
    status:statusAdoptions


})



export type Adoption = v.InferOutput< typeof AdoptionSchema>
export type createAdoption = Pick<Adoption,'breedName' | 'breedImageUrl' | 'message' >
export type onlyId = Pick<Adoption, 'id'>
export type statusAdoptions = v.InferOutput<typeof statusAdoptions>



export const DogsApiSchema = v.object({
    id:v.string()
})

export type dogs = v.InferOutput<typeof DogsApiSchema>
