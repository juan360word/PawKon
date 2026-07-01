
import axios from "axios";


const URL = 'https://api.thedogapi.com/v1'

const DogApiCLient = axios.create({
    baseURL: URL,
    headers:{
        'x-api-key':process.env.KEY_DOG_API
    }
})

export const GetAllBreeds = async () => {
    const Response = await DogApiCLient.get('/breeds')
    return Response.data
}

export const GetIDBreeds = async (id:string) => {
    const response = await DogApiCLient.get(`/breeds/${id}`)
    return response.data
}


export const GetImages = async (breedsId: string) => {
    const Response = await DogApiCLient.get('/images/search',
        {
            params: {breed_ids:breedsId,limit: 20}
        }
    )
    return Response.data
}



