

import { Router } from "express";
import {body,param} from 'express-validator'
import { ControllerAdoption } from "../Controllers/ControllerAdoption";
import { ErrorValidate } from "./Middleware/Error";
import { Protection } from "./Middleware/Protect";
import { IsDoctor } from "./Middleware/RoleCheck";


const RouterAdoption = Router()

RouterAdoption.post('/Create',
    Protection,
    ErrorValidate,
    ControllerAdoption.create
)

RouterAdoption.get('/Alladopciones',
    IsDoctor,
    Protection,
    ErrorValidate,
    ControllerAdoption.GetAdoptionAll
)

RouterAdoption.get('/MyAdoption',
    Protection,
    ErrorValidate,
    ControllerAdoption.UserGetAdoption
)

RouterAdoption.patch('/:id/status',
    IsDoctor,
    Protection,
    ErrorValidate,
    ControllerAdoption.UpdateAdoption
)


export default RouterAdoption

