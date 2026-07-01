
import {Request,Response,NextFunction} from 'express'
import {body,param} from 'express-validator'
import Adoption from '../Models/Adoption'
import mongoose, { mongo } from 'mongoose'



export class ControllerAdoption {

    // El usuario creara la adopcion
    static create = async (req:Request,res:Response) => {
        try {
            
            const {breedName,breedImageUrl,messaje} = req.body
            const userID = new mongoose.Types.ObjectId(req.user.id)

            const Adoptions = await Adoption.create({
                user: userID ,
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
      static GetAdoptionAll = async (req:Request,res:Response) => {
        try {
            const Adoptions = await Adoption.find().populate('user','name mail')
            res.status(200).json(Adoptions)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Fetching Adoption'})
        }
    }

    // El usuario podra ver sus propios solicitudes

     static UserGetAdoption = async (req:Request,res:Response) => {
        try {
             const userId = new mongoose.Types.ObjectId(req.user?.id)
            const Adoptions = await Adoption.find({user: userId})
            res.status(200).json(Adoptions) 
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Fetching Adoption '})
        }
     }

     // El Doctor podra actualzar el estado de la solicitud

      static UpdateAdoption = async (req:Request,res:Response) => {
      
        try {
            const {id} = req.params
            const {status} = req.body

            const Adoptions = await Adoption.findByIdAndUpdate(
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