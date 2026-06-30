
import express from 'express'
import dotenv from 'dotenv' 
import RoterAuth from './Routes/RouterAuth'
dotenv.config()



const app = express()
app.use(express.json())


app.use('/api/Auth',RoterAuth)


export default app


