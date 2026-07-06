

import { Router } from "express";
import { body } from "express-validator";
import { ErrorValidate } from "./Middleware/Error";
import { ControllerApiDog } from "../Controllers/ControllerApiDog";
import { Protection } from "./Middleware/Protect";



const RouterApiDog = Router()

RouterApiDog.get('/breeds', 
    ErrorValidate,
    ControllerApiDog.GetBreeds

)
RouterApiDog.get('/breeds/:id',
    ErrorValidate,
    ControllerApiDog.GetBreed
)
RouterApiDog.get('/breeds/:id/images',
    ErrorValidate,
    ControllerApiDog.GetImages
)

export default RouterApiDog




