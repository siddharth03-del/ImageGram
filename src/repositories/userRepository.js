import users from "../schema/user.js";
import bcrypt from "bcrypt";
export const userSignUp = async (detailsObject) =>{
    try{
        const username = detailsObject.username;
        const email = detailsObject.email;
        const password = detailsObject.password;
        const user = await users.create({username, email, password});
        return user;
    }catch(error){
        console.log(error.message);
        if(error.name == "ValidationError"){
            throw {
                status : 400,
                message : "The username or email already exists. Try using different email or username"
            }
        }
        throw {
            status : 500,
            message : "Unexpected error occured"
        }
    }
}

export const findUserByEmailId = async (emailId) =>{
    try{
        const user = await users.findOne({email : emailId}).exec();
        console.log(user);
        return user;
    }catch(error){
        console.log(error);
    }
}
export const findUserById = async (_id) => {
    try{
        const user = await users.findById(_id);
        return user;
    }catch(error){
        console.log(error);
    }
}

export const findAllUsersByPrefix = async (prefix, page, limit) =>{
    try{
        const skip = limit*(page -1);
        const user = await users.find({username : {$regex : prefix, $options : "i"}}, {"username" : 1, "_id" : 1});
        return user;
    }catch(error){
        console.log(error);
    }
}

export const getUsername = async (userId)=>{
    try{
        const username = await users.findOne({_id : userId}, {username : 1});
        return username;
    }catch(error){
        console.log(error);
    }
}

export const findUserByUsername = async (username)=>{
    try{
        const user = await users.findOne({username});
        return user;
    }catch(error){
        console.log(error);
    }
}

export const deleteUser = async(userId)=>{
    try{
        const response = await users.deleteOne({_id : userId});
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const changeAccountPassword = async (email, password)=>{
    try{
        const SALT = bcrypt.genSaltSync(9);
        const hashed = bcrypt.hashSync(password, SALT);
        const response = await users.findOneAndUpdate({email: email}, {password: hashed});
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}