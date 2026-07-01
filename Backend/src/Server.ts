
import express from 'express'
import dotenv from 'dotenv' 
import RoterAuth from './Routes/RouterAuth'
import RouterAppointment from './Routes/RouterAppointment'
import RouterAdoption from './Routes/RouterAdoption'
dotenv.config()



const app = express()
app.use(express.json())


app.use('/api/Auth',RoterAuth)
app.use('/api/Appointments',RouterAppointment)
app.use('/api/Adoptions',RouterAdoption)
app.use('/api/Dogs',)

export default app


