
import dotenv from 'dotenv'
dotenv.config()

import app from "../Server";
import request from 'supertest'


const UserValid = {
    name: 'Juan',
    mail: 'Juan@test.com',
    password: '123456'
}


const PetvalidBreeds = {
    breedName: "Golden Retriever",
    breedImageUrl: "https://cdn2.thedogapi.com/images/example.jpg",
    message: "Me gustaría adoptar este perro"
}


const token = async () => {
    const req = await request(app)
    .post('/api/Auth/Register')
    .send(UserValid)
    return req.body.token
}


describe('Adoption', () => {

    // crear una adopcion

    test('Create adoption request successfully',async () => {
        const user = await token()

        const req = await request(app)
        .post('/api/Adoptions/Create')
        .set('Authorization',`Bearer ${user}`)
        .send(PetvalidBreeds)

        expect(req.status).toBe(201)
        expect(req.body).toHaveProperty('breedName',PetvalidBreeds.breedName)
        expect(req.body).toHaveProperty('message',PetvalidBreeds.message)
    })

    // Sin token

    test('Return 401 if no token provided', async () => {
        const req = await request(app)
        .post('/api/Adoptions/Create')
        .send(PetvalidBreeds)

        expect(req.status).toBe(401)
    })

    // Ver cita vacia

    test('Return empty array if user has no adoption',async () => {
        const user = await token()

        const req = await request(app)
        .get('/api/Adoptions/MyAdoption')
        .set('Authorization',`Bearer ${user}`)

        expect(req.status).toBe(200)
        expect(req.body).toHaveLength(0)
    })

    // ver las adopcines despues de crearlas 

    test('Return  Adoption after creating one',async () => {
        const user = await token()
        
        await request(app)
        .post('/api/Adoptions/Create')
        .set('Authorization',`Bearer ${user}`)
        .send(PetvalidBreeds)

        const req = await request(app)
        .get('/api/Adoptions/MyAdoption')
        .set('Authorization',`Bearer ${user}`)
        
        expect(req.status).toBe(200)
        expect(req.body).toHaveLength(1);
        expect(req.body[0]).toHaveProperty("breedName", PetvalidBreeds.breedName)
    })

    // El usuario normal no puedde ver las adopciones (Solo el doctor)

    test('Return 403 if user to access all adoptions', async () => {
        const user = await token()

        const req = await request(app)
        .get('/api/Adoptions/Alladopciones')
        .set('Authorization', `Bearer ${user}`)

        expect(req.status).toBe(403)
    })


})







