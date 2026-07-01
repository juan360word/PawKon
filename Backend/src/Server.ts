
import express from 'express'
import RoterAuth from './Routes/RouterAuth'
import RouterAppointment from './Routes/RouterAppointment'
import RouterAdoption from './Routes/RouterAdoption'
import RouterApiDog from './Routes/RouterApiDog'


const app = express()
app.use(express.json())


app.use('/api/Auth',RoterAuth)
app.use('/api/Appointments',RouterAppointment)
app.use('/api/Adoptions',RouterAdoption)
app.use('/api/Dogs',RouterApiDog)

export default app


