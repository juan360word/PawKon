
import {Request,Response} from 'express'
import { GetAllBreeds, GetIDBreeds,GetImages } from './Services/ApiDog'


export class ControllerApiDog {
    static GetBreeds = async(req:Request,res:Response) => {
        try {
            const breeds = await GetAllBreeds()
            res.status(200).json(breeds)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Breeds'})
        }
    }

    static GetBreed = async(req:Request,res:Response) => {
        try {
            const id = req.params.id as string
            const breed = await GetIDBreeds(id)
            res.status(200).json(breed)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Error Breed'})
        }
     }

    static GetImages = async (req:Request,res:Response)  => {
        try {
            const  id  = req.params.id as string
            const images = await GetImages(id)
            res.status(200).json(images)
        } catch (error) {
             console.log(error)
            res.status(500).json({message:'Error In Images'})
        }
    }
}
