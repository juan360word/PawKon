
import dotenv from 'dotenv'
dotenv.config()

import app from "../Server";
import request from 'supertest'



// validacion de prueba

const UserValid = {
    name: 'Juan',
    mail: 'Juan@test.com',
    password: '123456'
}
// validacion de prueba

const Petvalid = {
    namePet: 'Tony',
    description: 'El perro esta sucio nececita un lavado de cuerpo',
    date:'2026-04-18'
}

// general el token

const token = async () => {
    const req = await request(app)
    .post('/api/Auth/Register')
    .send(UserValid)
    return req.body.token
}


describe('Appointments',() => {
    // creacion de cita
    test('should create ment successfully',async () => {
        const user = await token()
        
        const req = await request(app)
        .post('/api/Appointments/Create')
        .set('Authorization',`Bearer ${user}`)
        .send(Petvalid)


        expect(req.status).toBe(201)
        expect(req.body).toHaveProperty('namePet',Petvalid.namePet)
        expect(req.body).toHaveProperty('description',Petvalid.description)
    })

    // crear una cita sin tokens

    test('should return 401 if no token provided',async () => {
        const req = await request(app)
        .post('/api/Appointments/Create')
        .send(Petvalid)

        expect(req.status).toBe(401)
    })

    // crear una cita incompleta

    test('return 400 if required fields are missing',async() => {
        const user = await token()

        const req = await request(app)
        .post('/api/Appointments/Create')
        .set('Authorization',`Bearer ${user}`)
        .send({ namePet: 'Tony' }) 

        expect(req.status).toBe(400)
    })

    // ver las citas de uno, despues de crearlas

    test('return appointment after creating one',async () => {
        
        const user = await token()

        // creamos la cita
        await request(app)
        .post('/api/Appointments/Create')
        .set('Authorization',`Bearer ${user}`)
        .send(Petvalid)

        // luego traemos las citas ya echas

        const req = await request(app)
        .get('/api/Appointments/Myappointment')
        .set('Authorization',`Bearer ${user}`)

        expect(req.status).toBe(200)
        expect(req.body.Appointment).toHaveLength(1);
        expect(req.body.Appointment[0]).toHaveProperty("namePet", Petvalid.namePet)
        
    })

})