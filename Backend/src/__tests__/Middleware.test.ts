
import dotenv from 'dotenv'
dotenv.config()

import app from "../Server";
import request from 'supertest'

const UserValid = {
    name: 'Juan',
    mail: 'Juan@test.com',
    password: '123456'
}


describe('Auth-Login',() => {
    beforeAll(async () => {
        await request(app)
        .post('/api/Auth/Register')
        .send(UserValid)
    })


    test('It should reject without a token', async () => {
        const req = await request(app)
        .get('/api/Appointments/Myappointment')

        expect(req.status).toBe(401)



    })


})


describe('Middleware-Protect', () => {
    test(' without a token', async() => {
        const req = await request(app)
        .get('/api/Appointments/Myappointment')
        expect(req.status).toBe(401)
    })

    test('token invalid',async () => {
        const req = await request(app)

        .get('/api/Appointments/Myappointment')
        .set('Authorization', 'Bearer TokenFalso0818')

        expect(req.status).toBe(401)
    })

    test('should allow access with token valid',async () => {
        const user = await request(app)
        .post('/api/Auth/Register')
        .send(UserValid)

        const token = user.body.token

        const req = await request(app)
        .get('/api/Appointment/Myappointment')
        .set('Authorization',`Bear ${token}`)
        
        expect(req.status).not.toBe(401)
    })

})

describe('Middleware-IsDoctor', () => {
    test('should return 401 if user role is User',async () => {
        const User = await request(app)
        .post('/api/Auth/Register')
        .send(UserValid)

        const token = User.body.token

        const req = await request(app)
        .get('/api/Appointment/Allcitas')
        .set('Authorization',`Bear ${token}`) 

        expect(req.status).not.toBe(403)
    })
})

