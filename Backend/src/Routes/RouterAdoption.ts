

import { Router } from "express";
import {body,param} from 'express-validator'
import { ControllerAdoption } from "../Controllers/ControllerAdoption";
import { ErrorValidate } from "./Middleware/Error";
import { Protection } from "./Middleware/Protect";
import { IsDoctor } from "./Middleware/RoleCheck";


const RouterAdoption = Router()

RouterAdoption.post('/Create',
    Protection,
    body("message").notEmpty().withMessage('Add a description of why you want to adopt it'),
    body('breedName').notEmpty().withMessage('What breed of animal do you want?'),
    ErrorValidate,
    ControllerAdoption.create
)

RouterAdoption.get('/Alladopciones',
    Protection,
    IsDoctor,
    ErrorValidate,
    ControllerAdoption.GetAdoptionAll
)

RouterAdoption.get('/MyAdoption',
    Protection,
    ErrorValidate,
    ControllerAdoption.UserGetAdoption
)

RouterAdoption.patch('/:id/status',
    body('status').notEmpty().isIn(['pending', 'approved', 'rejected']).withMessage('Invalid Status'),
    Protection,
    IsDoctor,
    ErrorValidate,
    ControllerAdoption.UpdateAdoption
)


export default RouterAdoption

