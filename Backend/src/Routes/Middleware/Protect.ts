

import {Request,Response,NextFunction} from 'express'
import Jwt  from 'jsonwebtoken'



interface Token {
    id:string,
    role: "User" | "Doctor"
}


export const Protection = (req:Request,res:Response,next:NextFunction) => {
    try {
        
    const Auth = req.headers.authorization

    if(!Auth || !Auth.startsWith('bearer')){
        return res.status(401).json({message:'Not Authorized'})
    }

    const token = Auth.split(' ')[1]

    const Variable = Jwt.verify(token,process.env.LLAVE_PRIVADA_TOKEN) as Token

    req.user = {id:Variable.id,role:Variable.role}

    next()

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Invalid Token'})
    }
}



