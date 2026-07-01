
import {Request,Response,NextFunction} from 'express'
import {body,param} from 'express-validator'
import Ment from '../Models/Appointment'


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
            const Appointment = await Ment.find({id: req.user?.id})
            res.status(500).json({Appointment})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error The Citation Was Not Found '})
        }
     }
    
}

