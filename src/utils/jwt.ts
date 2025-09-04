import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

export default function createToken(payload: any){
    return jwt.sign(payload,process.env.JWTSECRET!, {
        expiresIn: "7d"
    })
}