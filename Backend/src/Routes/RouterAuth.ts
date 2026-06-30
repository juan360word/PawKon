
import { Router } from "express";
import {body,param} from 'express-validator'
import { ControllerAuth } from "../Controllers/ControllerAuth";
import { ErrorValidate } from "./Middleware/Error";

const RoterAuth = Router()


RoterAuth.post('/Register',
    body('name').notEmpty().withMessage('The name cannot be left blank'),
    body('password').isLength({min:6}).notEmpty().withMessage('Enter at least 6 digits, or leave it blank'),
    body('mail').notEmpty().isEmail().withMessage('The email cannot be empty'),
    ErrorValidate,ControllerAuth.Register
)

RoterAuth.post('/Login',
    body('mail').notEmpty().isEmail().withMessage('The email cannot be empty'),
    body('password').isLength({min:6}).notEmpty().withMessage('Enter at least 6 digits, or leave it blank'),
    ErrorValidate,ControllerAuth.Login
)

export default RoterAuth

