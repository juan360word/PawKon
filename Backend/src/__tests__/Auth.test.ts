import dotenv from 'dotenv'
dotenv.config()

import app from "../Server";
import request from 'supertest'


const UserValid = {
    name: 'Juan',
    mail: 'JUan@test.com',
    password: '123456'
}

describe('Auth and Register', () => {
    test('should register new user and return token', async () => {
        const req = await request(app)
        .post('/api/Auth/Register')
        .send(UserValid)

        expect(req.status).toBe(201)
        expect(req.body).toHaveProperty('token')
        expect(req.body).toHaveProperty('mail',UserValid.mail)
        expect(req.body).not.toHaveProperty('password')

    })
})


