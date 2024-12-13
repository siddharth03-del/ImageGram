import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config/server_config.js';
export const generateJWTPasswordChange = (payload)=>{
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn : 60*10});
    return token;
}
export const verifyJWTPasswordChange = (token) =>{
    const user = jwt.verify(token, JWT_SECRET);
    return user;
}