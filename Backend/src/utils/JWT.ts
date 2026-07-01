import Jwt from "jsonwebtoken";
import type { StringValue } from "ms";


type userPayload = {
    id: string
    role?: string
}

export const webToken = (payload: userPayload): string => {
  const secret = process.env.LLAVE_PRIVADA_TOKEN;
  
  console.log("SECRET USADO:", secret);

  return Jwt.sign(payload, secret as string, {
    expiresIn: process.env.Exp|| "7d",
  } as Jwt.SignOptions);
};
