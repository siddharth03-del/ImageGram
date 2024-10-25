import { userSignUp } from "../repositories/userRepository.js";
import { findUserByEmailId, findUserById } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import { generateJWT } from "../utils/jwt.js";
export const signUpUser = async (details) => {
    try{
        const response = await userSignUp(details);
        return response;
    }catch(error){
        console.log(error);
    }
}
export const signInUser = async (details) =>{
    try{
        const user = await findUserByEmailId(details.email);
        if(!user){
            throw{
                status : 404,
                error : "User not found"
            }
        }
        console.log(user, "userfrom user service");
        const isValid = bcrypt.compareSync(details.password, user[0].password);
        if(isValid){
            const token = generateJWT({email : user[0].email, _id : user[0]._id, username : user[0].username});
            return token;
        }
        else{
            throw {
                status : 401,
                error : "Invalid password"
            }
        }
    }catch(error){
        throw error;
    }
}

export const userByEmail = async (emailId) =>{
    try{
        const user = await findUserByEmailId(emailId);
        return response;
    }catch(error){
        console.log(error);
    }
}

export const doesUserExist = async (details) => {
    try{
        const _id = details._id;
        const user = await findUserById(_id);
        return user;
    }catch(error){
        console.log(error);
    }
}