

// aca usaremos query => ayuda mucho a la pagina , para que sea mas rapida 
// y no usar tanto codigo 

import { useQuery } from "@tanstack/react-query";
import { GetBreeds,GetBreedsById,GetImages } from "../Api/DogsApi";


export const useBreeds = () => {
    return useQuery({
        queryKey:['breeds'],
        queryFn:GetBreeds
    })
}

export const useBreed = (id: number) => {
    return useQuery({
        queryKey:['breed', id],
        queryFn: () => GetBreedsById(id),
        enabled: !!id
    })
}

export const useBreedImages = (id: number) => {
    return useQuery({
        queryKey:['breedImages', id],
        queryFn: () => GetImages(id),
        enabled: !!id
    })
}