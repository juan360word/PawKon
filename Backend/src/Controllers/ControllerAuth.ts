
import {Request,Response}  from 'express'
import User from '../Models/User'
import { webToken } from '../utils/JWT'


export class ControllerAuth {
    
    static Register = async(req:Request,res:Response) => {
        try {
            const {name,mail,password} = req.body
            
            const UserExist = await User.findOne({mail})
            if(UserExist){
                return res.status(400).json({message:'User Already Exist'})
            }
            
            const user = await User.create({name,mail,password})
            const token = webToken({ id: user._id.toString(), role: user.role.toString() })

            res.status(201).json({id:user._id,name:user.name,mail:user.mail,token})


        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Error Register User'})
        }
    }

    static Login = async (req:Request,res:Response) => {
        try {
            const {mail,password} = req.body

            const user = await User.findOne({mail})
            if(!user) {
                return res.status(401).json({message:'Invalid Credentials'})
            }

            const Match = await user.comparePassword(password)
            if(!Match){
                return res.status(401).json({message:'Invalid Credentials'})
            }


            const token = webToken({ id: user._id.toString(), role: user.role.toString() })

            res.status(201).json({id:user._id,name:user.name,mail:user.mail,password:user.password,token})

            

        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Error Login User'})
        }
    }

    static RegisterDoctor = async (req: Request, res: Response) => {
        try {
            const { name, mail, password, secretCode } = req.body;

            // verificar el código secreto
                if (secretCode !== process.env.DOCTOR_SECRET_CODE) {
                return res.status(403).json({ message: "Invalid secret code" });
                }

                const UserExist = await User.findOne({ mail });
                if (UserExist) {
                return res.status(400).json({ message: "User Already Exist" });
                }

                // crear con rol Doctor directamente
                const user = await User.create({ name, mail, password, role: "Doctor" });
                const token = webToken({ id: user._id.toString(), role: user.role });

                res.status(201).json({
                id: user._id,
                name: user.name,
                mail: user.mail,
                role: user.role,
                token,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error Register Doctor" });
        }
    }

}

