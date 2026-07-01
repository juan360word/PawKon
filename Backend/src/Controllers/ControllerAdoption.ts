
import {Request,Response,NextFunction} from 'express'
import {body,param} from 'express-validator'
import Adoption from '../Models/Adoption'



export class ControllerAdoption {

    // El usuario creara la adopcion
    static create = (req:Request,res:Response) => {
        try {
            
            const {breedName,breedImageUrl,messaje} = req.body
            const userID = req.user.id

            const Adoptions = Adoption.create({
                user: userID as any,
                breedName,
                breedImageUrl,
                messaje
            })

            res.status(201).json(Adoptions)

        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Creating Adoption'})
        }
    }
    // El Doctor vera todas las solicitudes
      static GetAdoptionAll = (req:Request,res:Response) => {
        try {
            const Adoptions = Adoption.find().populate('user','name mail')
            res.status(200).json(Adoptions)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Fetching Adoption'})
        }
    }

    // El usuario podra ver sus propios solicitudes

     static UserGetAdoption = (req:Request,res:Response) => {
        try {
            const Adoptions = Adoption.find({id: req.user.id})
            res.status(200).json(Adoptions) 
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Fetching Adoption '})
        }
     }

     // El Doctor podra actualzar el estado de la solicitud

      static UpdateAdoption = (req:Request,res:Response) => {
      
        try {
            const {id} = req.params
            const {status} = req.body

            const Adoptions = Adoption.findByIdAndUpdate(
                id,
                {status},
                {new:true}
            )

        res.status(200).json(Adoptions)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Update Adoption '})
        }
    }

}