

import dotenv from 'dotenv'
dotenv.config()

import app from "./Server";
import { MongoDB } from "./config/MongoBD";

const port = process.env.PORT || 3560

const start = async () => {
        await MongoDB()
        app.listen(port,() => {
            console.log(`Se esta llamando a la base de datos con este puerto ${port}`)
        })
}

start()

