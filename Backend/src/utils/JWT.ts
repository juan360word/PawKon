import Jwt from "jsonwebtoken";


type userPayload = {
    id: string
    role?: string
}

export const webToken = (payload: userPayload) => {
    const token = Jwt.sign(payload, process.env.LLAVE_PRIVADA_TOKEN as string,
        { expiresIn: (process.env.Exp || '1d') as any }
    )
    return token
}
