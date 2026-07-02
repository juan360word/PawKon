
import { Router } from "express";
import {body,param} from 'express-validator'
import { ControllerAppointments } from "../Controllers/ControllerAppoMents";
import { ErrorValidate } from "./Middleware/Error";
import { Protection } from "./Middleware/Protect";
import { IsDoctor } from "./Middleware/RoleCheck";

const RouterAppointment = Router()

RouterAppointment.post('/Create', 
    Protection,
    body('namePet').notEmpty().withMessage('The pets name cannot be left blank'),
    body('description').notEmpty().withMessage('The description cannot be left blank'),
    body('date').isISO8601().isDate().withMessage('What a day!'),
    ErrorValidate,
    ControllerAppointments.create
)

RouterAppointment.get('/Allcitas',
    Protection,
    IsDoctor,
    ErrorValidate,
    ControllerAppointments.GetAllCitas
)

RouterAppointment.get('/Myappointment',
    Protection,
    ErrorValidate,
    ControllerAppointments.UserAppointment
)




export default RouterAppointment


