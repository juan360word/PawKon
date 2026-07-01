
import {Request,Response,NextFunction} from 'express'
import {body,param} from 'express-validator'
import Ment from '../Models/Appointment'
import mongoose from 'mongoose'

export class ControllerAppointments {
   
    static create = async (req:Request,res:Response) => {
        // El usuario crea una cita
        try {
        
            const {namePet,description,date} = req.body
            const userID = req.user.id

            const AppoMent = await Ment.create({
                user: userID as any,
                namePet,
                description,
                date

            })

            res.status(201).json(AppoMent)



        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Create'})
        }
    }

    // El Doctor ve las citas creadas o encontradas

      static GetAllCitas = async (req:Request,res:Response) => {
            try {
                const Appointment = await Ment.find().populate('user','name mail')
                res.status(201).json(Appointment)
            } catch (error) {
                 console.log(error)
                 res.status(500).json({message:'Error The Citation Was Not Found '})
            }
      }

    // El usuario ve sus propias citas

     static UserAppointment = async (req:Request,res:Response) => {
        try {
             const userId = new mongoose.Types.ObjectId(req.user?.id)
            const Appointment = await Ment.find({user:userId})
            res.status(200).json({Appointment})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error The Citation Was Not Found '})
        }
     }
    
}

