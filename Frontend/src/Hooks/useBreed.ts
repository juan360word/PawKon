

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

export const useBreed = (id:string) => {
    return useQuery({
        queryKey:['breed',id],
        queryFn: () => GetBreedsById({id}),
        enabled: !!id // para pasar el string a boolean (depende del resultado)
    })
}

export const useBreedImages = (id:string) => {
    return useQuery({
        queryKey:['breedImages',id],
        queryFn: () => GetImages({id}),
        enabled: !!id
    })
}