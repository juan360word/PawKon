
import { Router } from "express";
import {body,param} from 'express-validator'
import { ControllerAppointments } from "../Controllers/ControllerAppoMents";
import { ErrorValidate } from "./Middleware/Error";
import { Protection } from "./Middleware/Protect";
import { IsDoctor } from "./Middleware/RoleCheck";

const RouterAppointment = Router()

RouterAppointment.post('/Create', 
    body('user').notEmpty().withMessage('The username cannot be left blank'),
    body('namePet').notEmpty().withMessage('The pets name cannot be left blank'),
    body('description').notEmpty().withMessage('The description cannot be left blank'),
    body('date').isISO8601().isDate().withMessage('What a day!'),
    Protection,
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
    body('user').notEmpty().withMessage('The username cannot be left blank'),
    body('mail').notEmpty().isEmail().withMessage('Your username is incorrect. Please check it.'),
    Protection,
    ErrorValidate,
    ControllerAppointments.UserAppointment
)




export default RouterAppointment


