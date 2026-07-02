import dotenv from 'dotenv'
dotenv.config()


import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoserver: MongoMemoryServer 

beforeAll (async () => {
     mongoserver = await MongoMemoryServer.create()
    const uri = mongoserver.getUri()
    await mongoose.connect(uri)
})


afterAll (async () => {
   await mongoose.disconnect()
   await mongoserver.stop()
})

afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        await collections[key].deleteMany({})
    }
        
    
})




