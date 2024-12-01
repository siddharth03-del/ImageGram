import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config/server_config.js';
export const generateJWT = (payload)=>{
    console.log(payload);
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn : '7d'});
    return token;
}
export const verifyJWT = (token) =>{
    const user = jwt.verify(token, JWT_SECRET);
    return user;
}