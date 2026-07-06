
import axios from "axios";


const URL = 'https://api.thedogapi.com/v1'

const DogApiCLient = axios.create({
    baseURL: URL,
})

export const GetAllBreeds = async () => {
    const Response = await DogApiCLient.get('/breeds', {
        headers: { 'x-api-key': process.env.KEY_DOG_API }
    })

    const breeds = Response.data

    // buscar una imagen por cada raza
    const breedsWithImages = await Promise.all(
        breeds.map(async (breed: any) => {
            try {
                const imgResponse = await DogApiCLient.get('/images/search', {
                    headers: { 'x-api-key': process.env.KEY_DOG_API },
                    params: { breed_ids: breed.id, limit: 1 }
                })
                const image = imgResponse.data[0]
                return { ...breed, image: image ? { url: image.url } : null }
            } catch {
                return { ...breed, image: null }
            }
        })
    )

    return breedsWithImages
}

export const GetIDBreeds = async (id:string) => {
    const response = await DogApiCLient.get(`/breeds/${id}`, {
        headers: { 'x-api-key': process.env.KEY_DOG_API }
    })
    return response.data
}


export const GetImages = async (breedsId: string) => {
    const Response = await DogApiCLient.get('/images/search', {
        headers: { 'x-api-key': process.env.KEY_DOG_API },
        params: { breed_ids: breedsId, limit: 20 }
    })
    return Response.data
}



