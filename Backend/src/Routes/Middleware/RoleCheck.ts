

import { Request, Response, NextFunction } from "express";


export const IsDoctor = (req: Request, res: Response, next: NextFunction) => {

    if(req.user.role !== 'Doctor'){
        return res.status(403).json({message:'Access Denied,Doctors Only'})
    }

    next()
}
