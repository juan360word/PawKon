import mongoose from "mongoose";
import { exit } from "node:process";



export const MongoDB = async () => {
    try {
        const Conectada = await mongoose.connect(process.env.MONGO_HOST as string)
        const url = `${Conectada.connection.host}:${Conectada.connection.port}`
        console.log('base de datos conectada correctamente',url)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}