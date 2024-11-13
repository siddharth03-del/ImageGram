import { userSignUp } from "../repositories/userRepository.js";
import { findUserByEmailId, findUserById, findAllUsersByPrefix } from "../repositories/userRepository.js";
import { createUserCommunity , getUserCommunityByUserId} from "../repositories/communityRepository.js";
import bcrypt from 'bcrypt';
import { generateJWT } from "../utils/jwt.js";
import { getPostFromFollowingArray , getPostsOtherThanUserId} from "../repositories/postRepository.js";
export const signUpUser = async (details) => {
    try{
        const response = await userSignUp(details);
        if(!response){
            throw{
                status : 500,
                message : 'Internal Server Error'
            }
        }
        await createUserCommunity(response._id);
        return response;
    }catch(error){
        throw error;
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

export const getAllUsersService = async ( prefix ) =>{
    try{
        const user = await findAllUsersByPrefix(prefix);
        return user;
    }catch(error){
        throw error;
    }
}

export const getFeedForUserService = async(userId)=>{
    try{
        const userCommunity = await getUserCommunityByUserId(userId);
        console.log(userCommunity);
        const following = userCommunity.following;
        const feed = await getPostFromFollowingArray(following);
        return feed;
    }catch(error){
        throw error;
    }
}

export const getAllPostFeedForUserService = async(userId)=>{
    try{
        const posts = await getPostsOtherThanUserId(userId);
        return posts;
    }catch(error){
        throw error;
    }
}